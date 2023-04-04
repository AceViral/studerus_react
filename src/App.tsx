import React from "react";
import "./App.scss";
import RegisterForm from "./components/RegisterForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MainPage from "./components/MainPage";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h2>Studerus-Client</h2>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/register"
          element={<RegisterForm navigate={navigate} />}
        />
        <Route path="/login" element={<LoginForm navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
