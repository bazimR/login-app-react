import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import avatar from "./../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
const Username = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(setUser(values.username));
      navigate("/password");
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 ">
              Explore more by connecting with us.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                name="username"
                placeholder="Username"
              />
              <button type="submit" className={styles.btn}>
                Let's Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text.gret-500">
                Not a Member{" "}
                <Link className="text-red-500" to={"/register"}>
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
