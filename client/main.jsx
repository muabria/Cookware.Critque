import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from './redux/store.js'

import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
// import Profile from "./components/Profile";
// import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm.jsx";

// import Equipment from "./components/Equipment";

// TODO: Add React Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path="/" element={<HomePage />}>
        {/* <Route path="Profile" element={<Profile />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Equipment" element={<Equipment />} /> */}
      </Routes>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// TODO: Add Redux Store

// TODO: Import any other providers needed (eg. Material UI)


