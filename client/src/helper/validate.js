import toast from "react-hot-toast"
/** username validate */
export async function usernameValidate(values) {
    const error = validationVerify({}, values);
    return error
}
/** validation reuse */

function validationVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!')
    }
    else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}