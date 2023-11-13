import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm.jsx";

// import Equipment from "./components/Equipment";

// TODO: Add React Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Route path="/" element={<Home />}>
          <Route path="Profile" element={<Profile />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Equipment" element={<Equipment />} />
        </Route> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// TODO: Add Redux Store

// TODO: Import any other providers needed (eg. Material UI)


