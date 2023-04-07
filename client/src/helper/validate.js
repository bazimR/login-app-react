import toast from "react-hot-toast"
/** username validate */
export async function usernameValidate(values) {
    const error = usernameVerify({}, values);
    return error
}
// password validate
export async function passwordValidate(values) {
    const error = passwordVerify({}, values)
    return error
}
// validate profile
export async function profileValidation(values){
    const error = emailVerify({},values)
    return error;
}

// validate reset password
export async function resetPasswordValidation(values){
    const error = passwordVerify({},values)

    if(values.password!==values.confirm_password){
        error.exist=toast.error("Repeat password does not match...!")
    }

    return error;
}
//validate register form

export async function registerValidate(values){
    const error = usernameVerify({},values)
    passwordVerify(error,values)
    emailVerify(error,values)
    return error;
}

// validate password
function passwordVerify(error = {}, values) {

    const speacialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        error.password = toast.error('Password Required...!')
    }
    else if (values.password.includes(" ")) {
        error.password = toast.error("Password cannot have space")
    }
    else if (values.password.length <= 4) {
        error.password = toast.error("Password must have atleast four characters")
    }
    else if (!speacialChar.test(values.password)) {
        error.password = toast.error("Password must have atleast one special characters")
    }
    return error;
}
/** validation username */
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!')
    }
    else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

// validation email

function emailVerify(error={},values){
    if(!values.email){
        error.email=toast.error("Please enter email...!")
    }
    else if(values.email.includes(' ')){
        error.email=toast.error('Invalid email...!')
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)){
        error.email=toast.error("Invalid email format...!")
    }
}