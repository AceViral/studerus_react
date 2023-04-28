import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../api/localStorage";
import instance from "../../api/axios";
import Loader from "../Loader";

interface INote {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: number;
  updated_at: number;
}

export const MainPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<INote[]>([]);
  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("register");
    }
    const fetchData = async () => {
      try {
        const { data }: { data: INote[] } = await instance.get(
          "/note/get-note"
        );
        setNotes(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="main">
      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <input type="text" defaultValue={note.title} />
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};
