import { useEffect, useState } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import NoteForm from "../NoteForm";
import { getAccessToken } from "../../api/localStorage";

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
  const [notes, setNotes] = useState<INote[]>([
    {
      id: 1,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682623506,
      updated_at: 1682623506,
    },
    {
      id: 2,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682042,
      updated_at: 1682682042,
    },
    {
      id: 3,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682043,
      updated_at: 1682682043,
    },
    {
      id: 4,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682045,
      updated_at: 1682682045,
    },
    {
      id: 5,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682046,
      updated_at: 1682682046,
    },
    {
      id: 6,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682046,
      updated_at: 1682682046,
    },
    {
      id: 7,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682046,
      updated_at: 1682682046,
    },
    {
      id: 8,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682046,
      updated_at: 1682682046,
    },
    {
      id: 9,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682047,
      updated_at: 1682682047,
    },
    {
      id: 10,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682047,
      updated_at: 1682682047,
    },
    {
      id: 11,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682047,
      updated_at: 1682682047,
    },
    {
      id: 12,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682047,
      updated_at: 1682682047,
    },
    {
      id: 13,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682047,
      updated_at: 1682682047,
    },
    {
      id: 14,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682049,
      updated_at: 1682682049,
    },
    {
      id: 15,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682049,
      updated_at: 1682682049,
    },
    {
      id: 16,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682049,
      updated_at: 1682682049,
    },
    {
      id: 17,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682049,
      updated_at: 1682682049,
    },
    {
      id: 18,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682049,
      updated_at: 1682682049,
    },
    {
      id: 19,
      user_id: 1,
      title: "New note",
      content: "New idea",
      created_at: 1682682050,
      updated_at: 1682682050,
    },
  ]);
  const fetchData = async () => {
    try {
      const { data }: { data: INote[] } = await instance.get("/note/get-note");
      setNotes(data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("register");
    }
  });
  return (
    <div className="main">
      <div className="head">
        <h2>You are in the system!</h2>
      </div>
      <div className="menu">
        <div className="note_form">
          <NoteForm />
        </div>
        <div className="note_block">
          {notes.map((note) => (
            <div className="note-wrap" key={note.id}>
              <div className="note">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <span>№ {note.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
