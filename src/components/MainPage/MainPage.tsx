import { useEffect } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import NoteForm from "../NoteForm";
import { getAccessToken } from "../../api/localStorage";
import { INote } from "../../types";

interface Props {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

export const MainPage: React.FC<Props> = ({ notes, setNotes }) => {
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const { data }: { data: INote[] } = await instance.get("/note/get-note");
      setNotes(data);
    } catch (error) {
      alert(error);
    }
  };
  const deleteNote = async (id: number) => {
    try {
      await instance.delete(`/note/delete-note?id=${id}`);
      fetchData();
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("register");
    }
    fetchData();
  }, []);
  return (
    <div className="main">
      <div className="head">
        <h2>You are in the system!</h2>
      </div>
      <div className="menu">
        <div className="note_form">
          <NoteForm notes={notes} setNotes={setNotes} />
        </div>
        <div className="note_block">
          {notes.map((note) => (
            <div
              className="note-wrap"
              key={note.id}
              onDoubleClick={() => {
                deleteNote(note.id);
              }}
            >
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
