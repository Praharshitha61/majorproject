
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

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeesByRole = async (role: string) => {
  try {
    const response = await axios.get(`${API_URL}/employees/role/${role}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error fetching employees by role ${role}:`, error);
    throw error;
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/employees/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error);
    throw error;
  }
};

export const updateEmployeeAvailability = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${API_URL}/employees/${id}/availability`, data, getAuthHeader());
    return response.data.employee;
  } catch (error) {
    console.error(`Error updating employee ${id} availability:`, error);
    throw error;
  }
};
