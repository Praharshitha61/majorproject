
import { findServiceById } from './bankServices';
import { findEmployeeById } from './employees';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  employeeId: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  bankBranch: string;
  createdAt: string;
}

// Mock appointments data - in a real app, this would come from a database
let appointments: Appointment[] = [
  {
    id: 'appt1',
    userId: 'customer1',
    serviceId: 'acc-opening',
    employeeId: 'emp2',
    date: '2025-04-20',
    timeSlot: '10:00 AM',
    status: 'scheduled',
    bankBranch: 'Central Branch',
    createdAt: '2025-04-15'
  },
  {
    id: 'appt2',
    userId: 'customer2',
    serviceId: 'personal-loan',
    employeeId: 'emp3',
    date: '2025-04-22',
    timeSlot: '11:00 AM',
    status: 'scheduled',
    bankBranch: 'North Branch',
    createdAt: '2025-04-16'
  },
  // Additional test data
  {
    id: 'appt3',
    userId: 'customer1',
    serviceId: 'mortgage',
    employeeId: 'emp4',
    date: '2025-04-25',
    timeSlot: '2:00 PM',
    status: 'scheduled',
    bankBranch: 'South Branch',
    createdAt: '2025-04-17'
  },
  {
    id: 'appt4',
    userId: 'customer1',
    serviceId: 'fund-transfer',
    employeeId: 'emp1',
    date: '2025-04-19',
    timeSlot: '9:30 AM',
    status: 'completed',
    bankBranch: 'Central Branch',
    createdAt: '2025-04-10'
  },
  {
    id: 'appt5',
    userId: 'customer1',
    serviceId: 'credit-card',
    employeeId: 'emp5',
    date: '2025-04-18',
    timeSlot: '3:30 PM',
    status: 'cancelled',
    bankBranch: 'West Branch',
    createdAt: '2025-04-12'
  },
  {
    id: 'appt6',
    userId: 'customer2',
    serviceId: 'investment',
    employeeId: 'emp7',
    date: '2025-04-24',
    timeSlot: '1:00 PM',
    status: 'scheduled',
    bankBranch: 'East Branch',
    createdAt: '2025-04-17'
  },
  {
    id: 'appt7',
    userId: 'customer1',
    serviceId: 'insurance',
    employeeId: 'emp6',
    date: '2025-05-01',
    timeSlot: '11:30 AM',
    status: 'scheduled',
    bankBranch: 'North Branch',
    createdAt: '2025-04-17'
  },
  // More test appointments for the current user
  {
    id: 'appt8',
    userId: 'customer1',
    serviceId: 'wealth-management',
    employeeId: 'emp8',
    date: '2025-05-05',
    timeSlot: '10:30 AM',
    status: 'scheduled',
    bankBranch: 'Central Branch',
    createdAt: '2025-04-18'
  },
  {
    id: 'appt9',
    userId: 'customer1',
    serviceId: 'business-loan',
    employeeId: 'emp3',
    date: '2025-05-10',
    timeSlot: '2:30 PM',
    status: 'scheduled',
    bankBranch: 'South Branch',
    createdAt: '2025-04-18'
  },
  {
    id: 'appt10',
    userId: 'customer1',
    serviceId: 'fixed-deposit',
    employeeId: 'emp1',
    date: '2025-04-30',
    timeSlot: '11:00 AM',
    status: 'scheduled',
    bankBranch: 'West Branch',
    createdAt: '2025-04-16'
  }
];

export const getUserAppointments = (userId: string) => {
  console.log(`Fetching appointments for user ${userId} from mock data`);
  return appointments.filter(appointment => appointment.userId === userId);
};

export const getAppointmentDetails = (appointmentId: string) => {
  console.log(`Fetching details for appointment ${appointmentId} from mock data`);
  const appointment = appointments.find(appt => appt.id === appointmentId);
  if (!appointment) {
    console.log(`Appointment ${appointmentId} not found in mock data`);
    return null;
  }
  
  const service = findServiceById(appointment.serviceId);
  const employee = findEmployeeById(appointment.employeeId);
  
  return {
    ...appointment,
    service,
    employee
  };
};

export const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
  console.log('Creating new appointment in mock data:', appointmentData);
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `appt-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString()
  };
  
  appointments.push(newAppointment);
  toast.success('Appointment created successfully (Mock Data)');
  return newAppointment;
};

export const checkEmployeeAvailability = (employeeId: string, date: string, timeSlot: string) => {
  console.log(`Checking availability for employee ${employeeId} on ${date} at ${timeSlot} in mock data`);
  return !appointments.some(
    appt => 
      appt.employeeId === employeeId && 
      appt.date === date && 
      appt.timeSlot === timeSlot &&
      appt.status === 'scheduled'
  );
};

export const checkUserHasAppointment = (userId: string) => {
  console.log(`Checking if user ${userId} has appointments in mock data`);
  return appointments.some(
    appt => appt.userId === userId && appt.status === 'scheduled'
  );
};

export const cancelAppointment = (appointmentId: string) => {
  console.log(`Cancelling appointment ${appointmentId} in mock data`);
  const index = appointments.findIndex(appt => appt.id === appointmentId);
  if (index !== -1) {
    appointments[index].status = 'cancelled';
    toast.success('Appointment cancelled successfully (Mock Data)');
    return true;
  }
  toast.error('Failed to cancel appointment (Mock Data)');
  return false;
};

export const completeAppointment = (appointmentId: string) => {
  console.log(`Marking appointment ${appointmentId} as completed in mock data`);
  const index = appointments.findIndex(appt => appt.id === appointmentId);
  if (index !== -1) {
    appointments[index].status = 'completed';
    toast.success('Appointment marked as completed (Mock Data)');
    return true;
  }
  toast.error('Failed to complete appointment (Mock Data)');
  return false;
};

// New function for analytics
export const getAppointmentStatistics = (userId?: string) => {
  let filteredAppointments = userId ? appointments.filter(appt => appt.userId === userId) : appointments;
  
  return {
    total: filteredAppointments.length,
    scheduled: filteredAppointments.filter(appt => appt.status === 'scheduled').length,
    completed: filteredAppointments.filter(appt => appt.status === 'completed').length,
    cancelled: filteredAppointments.filter(appt => appt.status === 'cancelled').length,
    branches: Object.entries(
      filteredAppointments.reduce((acc, appt) => {
        acc[appt.bankBranch] = (acc[appt.bankBranch] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([branch, count]) => ({ branch, count })),
    services: Object.entries(
      filteredAppointments.reduce((acc, appt) => {
        const service = findServiceById(appt.serviceId);
        const name = service ? service.name : 'Unknown';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([service, count]) => ({ service, count }))
  };
};
