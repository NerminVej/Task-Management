import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Gets all the tasks of one user with his id.
export const getTasksByUserId = (userId: number) => {
  const url = `${API_BASE_URL}/tasks/user/${userId}`;
  return axios.get(url);
};

// Handles user signup.
export const signup = (name: string, email: string, password: string) => {
  const url = `${API_BASE_URL}/users/`;
  return axios.post(url, { username: name, email, password });
};

// Handles user login.
export const login = (email: string, password: string) => {
  const url = `${API_BASE_URL}/login/`;
  return axios.post(url, { email, password });
};

// Creates a new task for a user with the provided data.
export const createTask = (
  taskName: string,
  status: string,
  comment: string | null,
  time: string, // This has to be the real time format
  userId: number
) => {
  const url = `${API_BASE_URL}/users/${userId}/tasks`;
  return axios.post(url, { name: taskName, status, comment, time, userId });
};

// Gets the user ID by email.
export const getUserIdByEmail = (email: string) => {
  const url = `${API_BASE_URL}/users/email/${encodeURIComponent(email)}`;
  return axios.get(url);
};

// Deletes a task from the database that the user holds.
export const deleteTask = (userId: number, taskId: number) => {
  const url = `${API_BASE_URL}/tasks/user/${userId}/${taskId}`;
  return axios.delete(url);
};

// Handles the PUT request to update task status.
export const updateTaskStatus = (
  userId: number,
  taskId: number,
  status: string,
  name: string,
  time: string,
  comment: string
) => {
  const url = `${API_BASE_URL}/tasks/user/${userId}/${taskId}`;
  const data = {
    status,
    name,
    time,
    comment,
  };
  return axios.put(url, data);
};
