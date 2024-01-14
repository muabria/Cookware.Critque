import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";


import HomePage from "./components/HomePage/HomePage";
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
import EditUser from "./components/EditForms/EditUser";
import EditEquipment from "./components/EditForms/EditEquipment";
import api from "./redux/api";
import DummyAdminDashboard from "./components/Dashboards/DummyAdmin/DummyAdminDashboard";

const AppContents = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);

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
          <Route path="/account/edit" element={<EditUser/>} />
          <Route path="/dummy_admin" element={< DummyAdminDashboard/>} />

          <Route path="/new_review" element={<AddNewPost />} />
          <Route path="/edit_review/:id" element={<EditReviews/>} />

          <Route path="/review/:id" element={<PostsWithComments />} />
        
          <Route path="/explore" element={<AllPosts/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
          
          <Route path="/equipment/:id" element={<AllReviewsForEquipment/>} />
          <Route path="/edit_equipment/:id" element={<EditEquipment/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;

//for Windows, run server:dev & dev concurrently in different terminals