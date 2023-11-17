import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import Dashboard from "./components/UserDashboard/Dashboard";
import NewPostForm from "./components/NewPostForm";

const AppContents = () => {

  const token = useSelector((state) => state.auth.token)
  console.log(token)

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/new_review" element={<NewPostForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;