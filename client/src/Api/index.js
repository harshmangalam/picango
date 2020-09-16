import axios from "axios";
const ENDPOINT = "https://picango.herokuapp.com/api"

export const fetchAllPosts = async () => {
    try {
        const { data: { posts } } = await axios.get(`${ENDPOINT}/post`)
        return { posts }
    } catch (error) {
        return { error }

    }
}


export const loadUserById = async (userId) => {
     try {
            const { data: { user } } = await axios.get(`${ENDPOINT}/user/${userId}`)
            return { user }
    } catch (error) {
        return { error }

        }
    }


export const loadAllUsers = async () => {
    try {
        const { data: { users } } = await axios.get(`${ENDPOINT}/user/`)
        return { users }
    } catch (error) {
        return { error }

    }
}




export const LoginUser = async (loginData) => {
    try {
        const { data: { message, token, userId } } = await axios.post(`${ENDPOINT}/auth/login`, loginData)
        return {message,token,userId}
    } catch (error) {
        return { error }
    }
}




export const SignupUser = async (signupData) => {
    try {
        const { data: { message,userId } } = await axios.post(`${ENDPOINT}/auth/signup`, signupData)
        return { message,userId }
    } catch (error) {
        return { error }
    }
}
