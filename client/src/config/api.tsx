import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Gets all the tasks of one user with his id.
export const getTasksByUserId = (userId: number) => {
  const url = `${API_BASE_URL}/users/${userId}/tasks`;
  return axios.get(url);
};

// Handles our signup.
export const signup = (name: string, email: string, password: string) => {
  const url = `${API_BASE_URL}/users/`;
  return axios.post(url, { name, email, password });
};