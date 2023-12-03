import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import UserDashboard from "./components/Dashboards/UserDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import AllPosts from "./components/Posts/AllPosts";
import PostsWithComments from "./components/PostWithComments/PostsWithComments";
import AddNewPost from "./components/Posts/AddNewPost";
import NavBar from "./components/Navigation/NavBar";
import CategoryPage from "./components/Categories/CategoryPage";
import AllReviewsForEquipment from "./components/EquipmentsWithReviews/AllReviewsForEquipment";
import EditReviews from "./components/EditForms/EditReviews";

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

          <Route path="/new_review" element={<AddNewPost />} />
          <Route path="/edit_review/:id" element={<EditReviews/>} />

          <Route path="/review/:id" element={<PostsWithComments />} />
        
          <Route path="/posts" element={<AllPosts/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
          
          <Route path="/equipment/:id" element={<AllReviewsForEquipment/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;

//for Windows, run server:dev & dev concurrently in different terminals