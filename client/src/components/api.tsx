import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getTasksByUserId = (userId: number) => {
  const url = `${API_BASE_URL}/users/${userId}/tasks`;
  return axios.get(url);
};
