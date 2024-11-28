import "./App.css";
import Register from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import UserList from "./components/UserList/UserList.jsx";
import Wrapper from "./components/Wrapper/Wrapper.jsx";
import EditUser from"./components/EditUser/EditUser.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/UserList" element={<UserList/>} />
            <Route path="/EditUser/:id" element={<EditUser/>} />

          </Routes>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;