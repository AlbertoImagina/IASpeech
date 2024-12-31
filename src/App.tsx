import { BrowserRouter } from "react-router-dom";
import { RuterController } from "./routerController/RuterController";
import { useState } from "react";
import { Users } from "./types/Users";
import { NavigateFunction } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {

  const storedUser = localStorage.getItem("user");
  const userPerfil: Users = storedUser ? JSON.parse(storedUser) : null;


  const [user, setUser] = useState<Users>({
    nombre: userPerfil?.nombre || "",
    apellidos: userPerfil?.apellidos || "",
    email: userPerfil?.email || "",
    createdAt: userPerfil?.createdAt || new Date(),
    id: userPerfil?.id || "",
    telefono: userPerfil?.telefono || "",
    password: ""
  })

  const [auth, setAuth] = useState<boolean>(localStorage?.getItem("auth") === "true" ? true : false)

  const logout = (navigate: NavigateFunction) => {
    localStorage.removeItem("user")
    localStorage.removeItem("auth")

    setUser({
      nombre: null,
      apellidos: null,
      email: null,
      createdAt: null,
      id: null,
      telefono: null,
      password: null
    })

    setAuth(false)

    navigate("/")
  }

  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user, setUser, auth, setAuth, logout }}>
        <BrowserRouter>
          <RuterController />
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export { App };
