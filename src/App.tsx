import React, { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import Loader from "./components/Loader";
import AuthForm from "./components/AuthForm";
import Notification from "./components/Notification";
import { INotification } from "./types";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  return !isLoading ? (
    <div className="App">
      <div className="notification_block">
        {notifications.map((notification, index) => (
          <Notification
            text={notification.text}
            type={notification.type}
            key={index}
            onClick={() => {
              setNotifications(
                notifications.filter((elem) => elem !== notification)
              );
            }}
          />
        ))}
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/register"
          element={
            <AuthForm
              type={"register"}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              notifications={notifications}
              setNotifications={setNotifications}
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
              notifications={notifications}
              setNotifications={setNotifications}
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
