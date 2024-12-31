import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import {Login} from "../pages/Login";
import { useAuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Register } from "../pages/Register";

const RuterController = () => {

  const { auth } = useAuthContext();

  return (
    <Routes>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={ auth ? <Home /> : <Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  )
}

export { RuterController }