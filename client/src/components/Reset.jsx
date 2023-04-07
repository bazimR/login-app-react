import React from "react";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";
const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password:""
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{width:'50%'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 ">
              Explore more by connecting with us.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} action="" className="py-1">
            <div className="py-20 textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                name="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirm_password")}
                className={styles.textbox}
                type="password"
                name="confirm_password"
                placeholder="Repeat Password"
              />
              <button type="submit" className={styles.btn}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
