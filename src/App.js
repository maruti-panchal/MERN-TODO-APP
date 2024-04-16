import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import UserLogin from "./component/user-login";
import UserRegister from "./component/user-register";
import Dashboard from "./component/user-dashboard";
import AddTask from "./component/add-task";
import EditTask from "./component/edit-task";
import Home from "./component/Home";
import TodoHeader from "./component/TodoHeader";

import Error from "./component/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TodoHeader />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<UserLogin />}></Route>
          <Route path="register" element={<UserRegister />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="error" element={<Error />}></Route>
          <Route path="add-task" element={<AddTask />}></Route>
          <Route path="edit" element={<EditTask />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
