import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/login/SignUp";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateMatch from "./components/match/CreateMatch";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/match-create" element={<CreateMatch />} />
      </Routes>
    </>
  );
}

export default App;
