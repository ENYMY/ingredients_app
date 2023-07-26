import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./Auth/auth-context";
import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";

const App = () => {
  const context = useContext(AuthContext);
  let content = <Auth></Auth>;
  if (context.isAuth) {
    content = <Ingredients />;
  }
  return content;
};
export default App;
