import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";

import store from "./redux/store";
import { Provider } from "react-redux";
import AppContents from "./AppContents";

const App = () => {

  return (
    <Provider store={store}>
      <AppContents />
    </Provider>
  );
}

export default App;