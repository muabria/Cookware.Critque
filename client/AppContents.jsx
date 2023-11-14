import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

const  AppContents= () => {

  const token = useSelector( (state) => state.auth.token)
  console.log(token)

  return (
      <div className="App">
        <NavBar />
        <RegisterForm />
        <LoginForm />
      </div>
  );
}

export default AppContents ;