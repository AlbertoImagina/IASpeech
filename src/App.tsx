import { BrowserRouter} from "react-router-dom";
import { RuterController } from "./routerController/RuterController";

const App = () => {
  return (
    <BrowserRouter>
      <RuterController />
    </BrowserRouter>
  );
}

export {App};
