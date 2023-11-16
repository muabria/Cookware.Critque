import store from "./redux/store";
import { Provider } from "react-redux";
import AppContents from "./AppContents";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContents />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginForm/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;