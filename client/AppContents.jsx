import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import Dashboard from "./components/UserDashboard/Dashboard";
import CommentForm from "./components/CommentForm";
import AllPost from "./components/AllPost";
import PostsComments from "./components/PostsComments";

const AppContents = () => {

  const token = useSelector((state) => state.auth.token)
  console.log(token)

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        <PostsComments />
        {/* <CommentForm /> */}
        {/* <AllPost /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/commentform" element={<CommentForm />} />
       
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;