
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  isAvailable: boolean;
  availableDays: string[];
  availableTimeSlots: string[];
}

export const employees: Employee[] = [
  {
    id: 'emp1',
    name: 'John Smith',
    email: 'john.smith@bankapp.com',
    role: 'Branch Manager',
    isAvailable: true,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    id: 'emp2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@bankapp.com',
    role: 'Bank Officer',
    isAvailable: true,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    id: 'emp3',
    name: 'Michael Chen',
    email: 'michael.chen@bankapp.com',
    role: 'Loan Officer',
    isAvailable: false,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
  },
  {
    id: 'emp4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@bankapp.com',
    role: 'Relationship Manager',
    isAvailable: true,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['9:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'],
  },
  {
    id: 'emp5',
    name: 'David Kim',
    email: 'david.kim@bankapp.com',
    role: 'Assistant Manager',
    isAvailable: false,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableTimeSlots: ['11:00 AM', '12:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    id: 'emp6',
    name: 'Lisa Wang',
    email: 'lisa.wang@bankapp.com',
    role: 'Credit Manager',
    isAvailable: true,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['9:00 AM', '1:00 PM', '3:00 PM'],
  },
  {
    id: 'emp7',
    name: 'Robert Taylor',
    email: 'robert.taylor@bankapp.com',
    role: 'NRI Relationship Manager',
    isAvailable: true,
    availableDays: ['Tuesday', 'Thursday'],
    availableTimeSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
  },
];

export const findEmployeesByRole = (role: string) => {
  // This function will handle roles like "Bank Officer / Assistant Manager"
  return employees.filter(employee => {
    const roleParts = role.split('/').map(r => r.trim());
    return roleParts.some(r => employee.role.includes(r));
  });
};

export const findEmployeeById = (id: string) => {
  return employees.find(employee => employee.id === id);
};

export const updateEmployeeAvailability = (id: string, isAvailable: boolean) => {
  const employeeIndex = employees.findIndex(emp => emp.id === id);
  if (employeeIndex !== -1) {
    employees[employeeIndex].isAvailable = isAvailable;
    return true;
  }
  return false;
};
