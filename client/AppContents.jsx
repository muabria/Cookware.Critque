import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

const  AppContents= () => {

  const token = useSelector( (state) => state.auth.token)
  console.log(token)

  return (
      <div className="App">
        <NavBar />
        <HomePage />
      </div>
  );
}

export default AppContents ;