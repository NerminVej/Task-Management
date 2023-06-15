import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Gets all the tasks of one user with his id.
export const getTasksByUserId = (userId: number) => {
  const url = `${API_BASE_URL}/tasks/user/${userId}`;
  return axios.get(url);
};

// Handles our signup.
export const signup = (name: string, email: string, password: string) => {
  const url = `${API_BASE_URL}/users/`;
  return axios.post(url, { username: name, email, password });
};

// Handles the login.
export const login = (email: string, password: string) => {
  const url = `${API_BASE_URL}/login/`;
  return axios.post(url, { email, password });
};

// Creates a new task for a user with the provided data
export const createTask = (
  taskName: string,
  status: string,
  comment: string | null,
  time: string, //This has to be the real time format
  userId: number
) => {
  const url = `${API_BASE_URL}/users/${userId}/tasks`;
  return axios.post(url, { name: taskName, status, comment, time, userId });
};

// Gets the user ID by email
export const getUserIdByEmail = (email: string) => {
  const url = `${API_BASE_URL}/users/email/${encodeURIComponent(email)}`;
  return axios.get(url);
};

