import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

const  AppContents= () => {

  const token = useSelector( (state) => state.auth.token)
  console.log(token)

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        <HomePage />
      </div>
      </div>
  );
}

export default AppContents ;