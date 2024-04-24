import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
