
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('bankAuthToken');
  return {
    headers: {
      'x-auth-token': token
    }
  };
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getServicesByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/services/category/${category}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error fetching services by category ${category}:`, error);
    throw error;
  }
};

export const getServiceById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/services/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error);
    throw error;
  }
};

export const seedServices = async () => {
  try {
    const response = await axios.post(`${API_URL}/services/seed`, {}, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error seeding services:', error);
    throw error;
  }
};
