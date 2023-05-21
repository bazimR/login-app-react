import React from "react";
import { Link,useNavigate } from "react-router-dom";
import avatar from "./../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import { useSelector } from "react-redux";
import useFetch from "../assets/hooks/fetch.hook";
import { verifyPassword } from "../helper/helper";

const Password = () => {
  const navigate = useNavigate()
  const { userName } = useSelector((state) => state.user);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${userName}`);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username:userName,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking.....",
        success: <b>Login successful</b>,
        error: <b>Password does not Match</b>,
      });
      loginPromise.then((res) => {
        console.log(res);
        let { token } = res;
        localStorage.setItem('token',token)
        navigate('/profile')
      });
    },
  });

  if (isLoading) return <h1>loading</h1>;
  if (serverError) return <h1>{serverError.message}</h1>;
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstname || apiData?.username}!
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 ">
              Explore more by connecting with us.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                name="password"
                placeholder="Password"
              />
              <button type="submit" className={styles.btn}>
                Let's Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text.gret-500">
                Forgot your password ?<br />
                <Link className="text-red-500" to={"/recovery"}>
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
