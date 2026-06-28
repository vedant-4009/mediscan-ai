import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const response = await axios.post(`${API_URL}/predict`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};