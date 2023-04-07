import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "./../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate  } from "../helper/validate";
import convertToBase64 from "../helper/converter";
const Register = () => {
  const [file,setFile] = useState()
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values= Object.assign(values,{profile:file||''})
      console.log(values);
    },
  });
  const onUpload = async (e)=>{
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 ">
              Join and explore world of react
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={file||avatar} className={styles.profile_img} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                name="email"
                placeholder="Email"
              />
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
                type="password"
                name="password"
                placeholder="Password"
              />
              <button type="submit" className={styles.btn}>
                Join
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text.gret-500">
                Already a member ?<br />
                <Link className="text-red-500" to={"/"}>
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
