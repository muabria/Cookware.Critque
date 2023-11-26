import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import UserDashboard from "./components/Dashboards/UserDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import CommentForm from "./components/PostComments/CommentForm";
import AllPosts from "./components/AllPosts"
import PostsComments from "./components/PostComments/PostsComments";
import AddNewPost from "./components/AddNewPost/AddNewPost";
import NavBar from "./components/NavBar";
import CategoryPage from "./components/Categories/CategoryPage";

const AppContents = () => {

  const token = useSelector((state) => state.auth.token)

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/admin_dashboard" element={<AdminDashboard/>} />
          <Route path="/commentform" element={<CommentForm />} />
          <Route path="/equipment/:id/review" element={<PostsComments />} />
          <Route path="/new_review" element={<AddNewPost />} />
          <Route path="/posts" element={<AllPosts/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;

//for Windows, run server:dev & dev concurrently in different terminals