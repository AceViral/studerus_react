import React, { useEffect } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../api/localStorage";
import instance from "../../api/axios";

export const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("register");
    }
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          instance
            .post("/note/create-note", {
              title: "First note",
              content: "some idea",
            })
            .then(() => {
              alert("good");
            })
            .catch(() => {
              alert("error");
            });
        }}
      >
        CLICK
      </button>
    </div>
  );
};
