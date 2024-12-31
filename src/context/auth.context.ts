import React, { Dispatch, SetStateAction, useContext } from "react";
import { Users } from "../types/Users";
import { NavigateFunction } from "react-router-dom";

interface UserContext {
    user: Users;
    auth: boolean;
    setUser: Dispatch<SetStateAction<Users>>;
    setAuth: Dispatch<SetStateAction<boolean>>;
    logout: (navigate: NavigateFunction) => void;
}

export const AuthContext = React.createContext<UserContext>({
    user: {
        nombre: null,
        apellidos: null,
        telefono: null,
        email: null,
        password: null,
        id: null,
        createdAt: null,
    },
    auth: false,
    setUser: () => { },
    setAuth: () => { },
    logout: () => { }
})

export const useAuthContext = () => {
    return useContext(AuthContext);
}