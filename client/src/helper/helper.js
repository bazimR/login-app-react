import axios from 'axios'

// Make api Requests


// authenticate function 
export async function authenticate(username){
    try {
        return await axios.post('/api/')
    } catch (error) {
        return {error:"Username doest exist..!"}
    }
}

