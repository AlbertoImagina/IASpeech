import { Users } from "../types/Users";
import axios, { AxiosError, AxiosResponse } from "axios";

const apiUser = axios.create({
    baseURL: import.meta.env.VITE_API_USERS_URL
})

apiUser.interceptors.request.use(
    (config) => config,

    (error) => {
        Promise.reject(error);
    }
);

apiUser.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error),
);

interface Auth {
    email: string
    password: string
}

const useAuthenticate = () => {

    const userLogin = async ({ email, password }: Auth) => {
        const { data } = await apiUser.get('users')

        const userFind = data?.find((user: Users) => user?.email === email)

        if (!userFind) return { auth: false, error: "Usuario no encontrado" }
        if (userFind?.password !== password) return { auth: false, error: "Su email o contraseña son incorrectos" }

        delete userFind.password

        return {
            user: userFind,
            auth: true
        }
    }

    const userRegister = async (data: Partial<Users>) => {
        return apiUser.post('users', data)
            .then((response) => response)
    }

    return {
        userLogin,
        userRegister
    }
}

export { useAuthenticate }