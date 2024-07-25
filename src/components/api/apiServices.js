import axios from "axios"
// const baseUrl = 'http://localhost:3000'//
// server hosted on Render https://render.com/
const baseUrl = 'https://vooshserver-xwjd.onrender.com'

export const SignUpApi = async (params, data) => {
    try {
        const res = await axios.post(`${baseUrl}/${params}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return res
    } catch (error) {
        return error.response
    }

}
export const LoginApi = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        return error.response
    }

}

export const GetTaskApi = async (data) => {
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

export const DeleteTaskApi = async (id) => {
    let data = id
    try {
        console.log(`${baseUrl}/deleteTask/${data}`)
        const res = await axios.delete(`${baseUrl}/deleteTask/${data}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        return error.response.data
    }

}

export const EditTaskApi = async (value) => {
    const _id = value._id
    const reqBody = { taskName: value.taskName, description: value.description }
    try {
        const res = await axios.put(`${baseUrl}/updateTask/${_id}`, reqBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        return error.response.data
    }

}


export const CreatTaskApi = async (value) => {

    try {
        const res = await axios.post(`${baseUrl}/createTask/`, value, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res
    } catch (error) {
        return error.response.data
    }

}