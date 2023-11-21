import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import Dashboard from "./components/UserDashboard/Dashboard";
import AddNewPost from "./components/AddNewPost/AddNewPost";
import NavBar from "./components/NavBar";


const AppContents = () => {

  const token = useSelector((state) => state.auth.token)
  console.log(token)

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        <Equipment/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/new_review" element={<AddNewPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;