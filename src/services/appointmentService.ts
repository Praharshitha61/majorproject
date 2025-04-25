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

export const getUserAppointments = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/user/${userId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    throw error;
  }
};

export const getAppointmentDetails = async (appointmentId: string) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/${appointmentId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment details:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, appointmentData, getAuthHeader());
    return response.data.appointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/appointments/${appointmentId}/status`, 
      { status: 'cancelled' },
      getAuthHeader()
    );
    return response.data.appointment;
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};

export const completeAppointment = async (appointmentId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/appointments/${appointmentId}/status`, 
      { status: 'completed' },
      getAuthHeader()
    );
    return response.data.appointment;
  } catch (error) {
    console.error('Error completing appointment:', error);
    throw error;
  }
};

export const checkEmployeeAvailability = async (employeeId: string, date: string, timeSlot: string) => {
  try {
    // This would be a real API call in a production app
    const response = await axios.get(
      `${API_URL}/appointments/check-availability?employeeId=${employeeId}&date=${date}&timeSlot=${timeSlot}`,
      getAuthHeader()
    );
    return response.data.available;
  } catch (error) {
    console.error('Error checking employee availability:', error);
    throw error;
  }
};
