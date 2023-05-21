import axios from 'axios'
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

// Make api Requests

// decode token
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token")
    else {
        let decode = jwt_decode(token)
        return decode;
    }
}
// authenticate function 
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username doest exist..!" }
    }
}

// get user details

export async function getUser({ username }) {
    try {
        const { data } = axios.get(`/api/user/${username}`)
        return { data }
    } catch (error) {
        return { error: "password doesnt match" }
    }
}

// register user function
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);
        let { username, email } = credentials;
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
        }
        return Promise.resolve(msg)

    } catch (error) {
        return Promise.reject({ error })

    }
}

// login function
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve(data)
        }
    } catch (error) {
        return Promise.reject({ error: "password doest match" })
    }
}

// update user function
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer \"${token}\"` } })
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "couldnt update Profile" })
    }
}
// generate otp
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } })
        if (status === 201) {
            let { data: { email } } = await getUser({ username })
            let text = `Your Password Recovery OTP is ${code}`
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovey otp" })
        }
        return Promise.resolve(code)
    } catch (error) {
        Promise.reject({ error })
    }
}
// verify OTP
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        Promise.reject(error)

    }
}
// reset password
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}
// admin login
export async function adminLogin({ username, password }) {
    try {
        if (username && password) {
            const { data } = await axios.post('/api/admin/login', { username, password })
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error: "Wrong Credentials" })
    }
}

export async function removeUser({ _id }) {
    try {
        if (_id) {
            const removedUser = await axios.put('/api/removeuser',{_id})
        }
    } catch (error) {
        return Promise.reject({ error: "Deletion failed" })
    }
}