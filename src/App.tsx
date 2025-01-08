import { BrowserRouter } from "react-router-dom";
import { RuterController } from "./router/RuterController";
import { useState } from "react";
import { Users } from "./types/Users";
import { NavigateFunction } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import { DataContext } from "./context/data.context";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./ui/theme";


function App() {

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
  const [step, setStep] = useState<number>(0)

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
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={{ user, setUser, auth, setAuth, logout }}>
        <DataContext.Provider value={{ step, setStep }}>
          <BrowserRouter>
            <RuterController />
          </BrowserRouter>
        </DataContext.Provider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App
