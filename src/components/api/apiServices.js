import axios from "axios"
// const baseUrl = 'http://localhost:3000'//
const baseUrl = 'https://vooshserver-xwjd.onrender.com'

export const AuthApiPost = async (params, data) => {
    try {
        console.log(`${baseUrl}/${params}`, "samm");
        const res = await axios.post(`${baseUrl}/${params}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        // console.log("in api ", res);
        return res
    } catch (error) {
        // console.log("in api ", error.response.data);

        return error.response.data
    }

}
export const AuthApiGet = async (data) => {
    console.log("in api ");
    try {
        const res = await axios.post(`${baseUrl}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        // console.log("in api ", error.response.data);

        return error.response.data
    }

}

export const GetTaskApi = async (data) => {
    console.log("in api ");
    try {
        const res = await axios.get(`${baseUrl}/getTask`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        // console.log("in api ", error.response.data);

        return error.response.data
    }

}

export const DeleteTask = async (id) => {
    let data = id
    try {
        const res = await axios.delete(`${baseUrl}/deleteTask/${data}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        // console.log("in api ", error.response.data);

        return error.response.data
    }

}