import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";

const App = () => {

    return (
      <div className="App">
        <NavBar />
        <RegisterForm />
        <LoginForm />
      </div>
    );
  }
  
  export default App;