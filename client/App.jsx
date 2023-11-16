import store from "./redux/store";
import { Provider } from "react-redux";
import AppContents from "./AppContents";
import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContents />
      </BrowserRouter>
    </Provider>
  );
}

export default App;