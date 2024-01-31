import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import UserDashboard from "./components/Dashboards/UserDashboard/UserDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard";
import AllPosts from "./components/EquipmentAndReviews/AllPosts";
import SingleReview from "./components/SingleReview/SingleReview";
import AddNewPost from "./components/AddReview/AddNewPost"
import NavBar from "./components/Navigation/NavBar";
import CategoryPage from "./components/Categories/CategoryPage";
import SingleEquipment from "./components/SingleEquipment/SingleEquipment";
import EditReviews from "./components/Dashboards/EditForms/EditReviews";
import EditUser from "./components/Dashboards/EditForms/EditUser";
import EditEquipment from "./components/EditEquipment/EditEquipment";
import DummyAdminDashboard from "./components/Dashboards/DummyAdmin/DummyAdminDashboard"

const AppContents = () => {

  return (
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

          <Route path="/review/:id" element={<SingleReview />} />
        
          <Route path="/explore" element={<AllPosts/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
          
          <Route path="/equipment/:id" element={<SingleEquipment/>} />
          <Route path="/edit_equipment/:id" element={<EditEquipment/>} />
        </Routes>
      </div>
  );
}

export default AppContents;