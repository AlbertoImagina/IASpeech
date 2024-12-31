import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

const RuterController = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export { RuterController }