import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { bankServices, getServicesByCategory, findServiceById } from '@/data/bankServices';
import { employees, findEmployeesByRole, findEmployeeById } from '@/data/employees';
import { createAppointment, checkUserHasAppointment, checkEmployeeAvailability } from '@/data/appointments';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, ArrowRight, FileCheck } from 'lucide-react';

interface BookingFormState {
  bankName: string;
  bankBranch: string;
  serviceId: string;
  employeeId: string;
  date: Date | undefined;
  timeSlot: string;
}

const NewAppointmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedEmployeeId = location.state?.employeeId;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [hasExistingAppointment, setHasExistingAppointment] = useState(false);
  const [servicesByCategory, setServicesByCategory] = useState<Record<string, typeof bankServices>>({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
  const [formState, setFormState] = useState<BookingFormState>({
    bankName: '',
    bankBranch: '',
    serviceId: '',
    employeeId: preSelectedEmployeeId || '',
    date: undefined,
    timeSlot: '',
  });
  
  const bankNames = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Kotak Mahindra Bank',
    'Union Bank of India',
    'IDFC FIRST Bank'
  ];
  
  const bankBranches = [
    'Abids',
    'Ameerpet',
    'Banjara Hills',
    'Begumpet',
    'Charminar',
    'Dilsukhnagar',
    'Gachibowli',
    'Himayatnagar',
    'Jubilee Hills',
    'Kukatpally',
    'Lakdikapul',
    'Madhapur',
    'Malakpet',
    'Mehdipatnam',
    'Miyapur',
    'Nampally',
    'Secunderabad',
    'Somajiguda',
    'Tarnaka',
    'Tolichowki',
    'Warangal',
  'Nizamabad',
  'Khammam',
  'Karimnagar',
  'Adilabad',
  'Mahbubnagar',
  'Nalgonda',
  'Sangareddy',
  'Medak',
  'Ranga Reddy',
  'Siddipet',
  'Mancherial',
  'Jagtial',
  'Bhadradri Kothagudem',
  'Kamareddy',
  'Mahabubabad',
  'Nagarkurnool',
  'Suryapet',
  'Vikarabad',
  'Wanaparthy',
  'Yadadri Bhuvanagiri',
  'Peddapalli',
  'Rajanna Sircilla',
  'Nirmal',
  'Jogulamba Gadwal',
  'Komaram Bheem',
  'Narayanpet',
  'Hanumakonda'
  ];
  
  
  // Step 1 - Check if user already has an appointment
  useEffect(() => {
    if (user) {
      const hasAppointment = checkUserHasAppointment(user._id);
      setHasExistingAppointment(hasAppointment);
    }
  }, [user]);
  
  // Get services by category
  useEffect(() => {
    setServicesByCategory(getServicesByCategory());
  }, []);
  
  // If employee is preselected, update service options
  useEffect(() => {
    if (preSelectedEmployeeId) {
      const employee = findEmployeeById(preSelectedEmployeeId);
      if (employee) {
        setFormState(prev => ({
          ...prev,
          employeeId: preSelectedEmployeeId
        }));
      }
    }
  }, [preSelectedEmployeeId]);
  
  // Update available time slots when date or employee changes
  useEffect(() => {
    if (formState.date && formState.employeeId) {
      const employee = findEmployeeById(formState.employeeId);
      if (employee) {
        const dayOfWeek = format(formState.date, 'EEEE');
        
        if (employee.availableDays.includes(dayOfWeek)) {
          // Filter time slots that are already booked
          const availableSlots = employee.availableTimeSlots.filter(slot => 
            checkEmployeeAvailability(formState.employeeId, format(formState.date!, 'yyyy-MM-dd'), slot)
          );
          
          setAvailableTimeSlots(availableSlots);
        } else {
          setAvailableTimeSlots([]);
          toast(`${employee.name} is not available on ${dayOfWeek}s.`);
        }
      }
    }
  }, [formState.date, formState.employeeId]);
  
  const handleInputChange = (field: keyof BookingFormState, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
    
    // If changing service, update employee
    if (field === 'serviceId') {
      const service = findServiceById(value);
      if (service) {
        const matchingEmployees = findEmployeesByRole(service.requiredEmployeeRole);
        if (matchingEmployees.length > 0) {
          setFormState(prev => ({
            ...prev,
            employeeId: matchingEmployees[0].id
          }));
        }
      }
    }
  };
  
  const getAvailableEmployees = () => {
    if (!formState.serviceId) return [];
    
    const service = findServiceById(formState.serviceId);
    if (!service) return [];
    
    return findEmployeesByRole(service.requiredEmployeeRole).filter(emp => emp.isAvailable);
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formState.bankName || !formState.bankBranch || !formState.serviceId) {
        toast('Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!formState.employeeId || !formState.date || !formState.timeSlot) {
        toast('Please select an employee, date, and time slot');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleBookAppointment = () => {
    if (!user) {
      toast('You must be logged in to book an appointment');
      return;
    }
    
    if (hasExistingAppointment) {
      toast('You already have a scheduled appointment. Please complete or cancel it before booking a new one.');
      return;
    }
    
    const newAppointment = createAppointment({
      userId: user._id,
      serviceId: formState.serviceId,
      employeeId: formState.employeeId,
      date: format(formState.date!, 'yyyy-MM-dd'),
      timeSlot: formState.timeSlot,
      status: 'scheduled',
      bankBranch: formState.bankBranch,
    });
    
    if (newAppointment) {
      toast('Appointment booked successfully!');
      navigate('/dashboard');
    } else {
      toast('Failed to book appointment. Please try again.');
    }
  };
  
  if (hasExistingAppointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-center">Existing Appointment</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">You already have a scheduled appointment. Please complete or cancel it before booking a new one.</p>
            <Button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-secondary">
              View Your Appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Book an Appointment</h1>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-center">
                <div className="flex items-center justify-center w-full max-w-md">
                  <Step 
                    number={1} 
                    title="Bank & Service" 
                    active={currentStep === 1} 
                    completed={currentStep > 1} 
                  />
                  <div className="w-12 h-0.5 bg-gray-200">
                    {currentStep > 1 && <div className="h-full bg-primary"></div>}
                  </div>
                  <Step 
                    number={2} 
                    title="Date & Time" 
                    active={currentStep === 2} 
                    completed={currentStep > 2} 
                  />
                  <div className="w-12 h-0.5 bg-gray-200">
                    {currentStep > 2 && <div className="h-full bg-primary"></div>}
                  </div>
                  <Step 
                    number={3} 
                    title="Confirm" 
                    active={currentStep === 3} 
                    completed={false} 
                  />
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Bank Name</label>
                    <Select
                      value={formState.bankName}
                      onValueChange={(value) => handleInputChange('bankName', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankNames.map(name => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bank Branch</label>
                    <Select
                      value={formState.bankBranch}
                      onValueChange={(value) => handleInputChange('bankBranch', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankBranches.map(branch => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Service Type</label>
                    <div className="space-y-4">
                      {Object.entries(servicesByCategory).map(([category, services]) => (
                        <div key={category} className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-500">{category}</h3>
                          <div className="grid grid-cols-1 gap-2">
                            {services.map(service => (
                              <label 
                                key={service.id} 
                                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                                  formState.serviceId === service.id 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="service"
                                  value={service.id}
                                  checked={formState.serviceId === service.id}
                                  onChange={() => handleInputChange('serviceId', service.id)}
                                  className="sr-only"
                                />
                                <div>
                                  <div className="font-medium">{service.name}</div>
                                  <div className="text-xs text-gray-500">Required: {service.requiredEmployeeRole}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Employee</label>
                    <Select
                      value={formState.employeeId}
                      onValueChange={(value) => handleInputChange('employeeId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableEmployees().map(employee => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name} ({employee.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formState.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formState.date ? (
                              format(formState.date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formState.date}
                            onSelect={(date) => handleInputChange('date', date)}
                            disabled={(date) => {
                              // Disable past dates and weekends
                              const dayOfWeek = format(date, 'EEEE');
                              const employee = formState.employeeId ? findEmployeeById(formState.employeeId) : null;
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              
                              return (
                                date < today || 
                                (employee && !employee.availableDays.includes(dayOfWeek))
                              );
                            }}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Time Slot</label>
                      <Select
                        value={formState.timeSlot}
                        onValueChange={(value) => handleInputChange('timeSlot', value)}
                        disabled={!formState.date || availableTimeSlots.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map(slot => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-slots-available" disabled>No available slots</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Appointment Summary</h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Bank</span>
                      <span>{formState.bankName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Branch</span>
                      <span>{formState.bankBranch}</span>
                    </div>
                    
                    <div className="flex flex-col sm:col-span-2">
                      <span className="text-sm text-gray-500">Service</span>
                      <span>{findServiceById(formState.serviceId)?.name}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Employee</span>
                      <span>{findEmployeeById(formState.employeeId)?.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Role</span>
                      <span>{findEmployeeById(formState.employeeId)?.role}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Date</span>
                      <span>{formState.date ? format(formState.date, 'PPP') : ''}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Time</span>
                      <span>{formState.timeSlot}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-start">
                      <FileCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Required Documents</h4>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                          {findServiceById(formState.serviceId)?.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 mt-2">
                          Please ensure you bring all the required documents for your appointment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button className="bg-primary hover:bg-secondary" onClick={handleNextStep}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-primary hover:bg-secondary" onClick={handleBookAppointment}>
                  Book Appointment
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

interface StepProps {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, active, completed }) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          active 
            ? 'bg-primary text-white' 
            : completed 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span className={`text-xs mt-1 ${active ? 'text-primary font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

export default NewAppointmentPage;
