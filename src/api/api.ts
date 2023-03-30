import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const authAPI = {
    register: (userData: { username: string; email: string; password: string }) =>
        api.post("/auth/register", userData).then((response) => {
            const { access_token } = response.data.user;
            localStorage.setItem("token", access_token);
            return response;
        }),

    login: (userData: { username: string; email: string; password: string }) =>
        api.post("/auth/login", userData).then((response) => {
            const { access_token } = response.data.user;
            localStorage.setItem("token", access_token);
            return response;
        }),

    checkUser: () =>
        api.get("/auth/check-user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),
};

export const noteAPI = {
    getNote: () =>
        api.get("/note/get-note", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),

    createNote: (noteData: { title: string; content: string }) =>
        api.post("/note/create-note", noteData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),

    deleteNote: (id: number) =>
        api.delete(`/note/delete-note?id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),

    updateNote: (id: number, noteData: { title: string; content: string }) =>
        api.put(`/note/update-note?id=${id}`, noteData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),
};
