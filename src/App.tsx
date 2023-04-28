import React, { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import Loader from "./components/Loader";
import AuthForm from "./components/AuthForm";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return !isLoading ? (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/register"
          element={
            <AuthForm
              type={"register"}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/login"
          element={
            <AuthForm
              type={"login"}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>
    </div>
  ) : (
    <Loader />
  );
}

export default App;
