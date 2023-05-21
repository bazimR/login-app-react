import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { adminValidate } from "../helper/validate";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import avatar from "./../assets/profile.png";
import { adminLogin } from "../helper/helper";
import { useDispatch } from "react-redux";
import { setAdmin } from "../store/adminSlice";

const Loginadmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: adminValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginAdminPromise = adminLogin({
        username: values.username,
        password: values.password,
      });
      toast.promise(loginAdminPromise, {
        loading: "Checking.....",
        success: <b>Login successful</b>,
        error: <b>Password does not Match</b>,
      });
      loginAdminPromise.then((res) => {
        dispatch(setAdmin(values.username));
        let { adminToken } = res.data;
        localStorage.setItem("adminToken", adminToken);
        navigate("/admin/home");
      });
    },
  });
  return (
    <div className="container my-32 mx-auto ">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex justify-center items-center h-min">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Admin</h4>
            <span className="py-2  text-xl w-2/3 text-center text-gray-500 ">
              User management.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </label>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                name="password"
                placeholder="Password"
              />
              <button type="submit" className={styles.btn}>
                Join
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text.gret-500">
                Vist user side ?<br />
                <Link className="text-red-500" to={"/"}>
                  user page
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginadmin;
