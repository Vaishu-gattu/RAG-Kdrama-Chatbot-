import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Change this to deployed URL if needed

export const sendMessage = async (question) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { question });
    return response.data.response;
  } catch (error) {
    console.error("API Error:", error);
    return "Oops! Something went wrong. Please try again.";
  }
};
