
import React, { useState } from 'react';
import { Calendar, UserCheck, Clock, Briefcase, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Appointment, cancelAppointment } from '@/data/appointments';
import { findServiceById } from '@/data/bankServices';
import { findEmployeeById } from '@/data/employees';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface AppointmentListProps {
  appointments: Appointment[];
  onAppointmentUpdate?: () => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onAppointmentUpdate }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleCancelAppointment = (appointmentId: string) => {
    const cancelled = cancelAppointment(appointmentId);
    if (cancelled) {
      toast('Appointment cancelled successfully');
      if (onAppointmentUpdate) {
        onAppointmentUpdate();
      }
      setIsCancelDialogOpen(false);
    } else {
      toast('Failed to cancel appointment');
    }
  };

  const openDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  const openCancelDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelDialogOpen(true);
  };

  if (!appointments.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">No appointments scheduled.</p>
        <Button className="mt-4 bg-primary hover:bg-secondary">
          Book an Appointment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const service = findServiceById(appointment.serviceId);
        const employee = findEmployeeById(appointment.employeeId);
        
        return (
          <Card key={appointment.id} className="overflow-hidden">
            <div className={`h-2 ${appointment.status === 'scheduled' ? 'bg-primary' : appointment.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
            <CardContent className="p-6">
              <h3 className="font-medium text-lg">{service?.name || 'Unknown Service'}</h3>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{appointment.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{appointment.timeSlot}</span>
                </div>
                
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{employee?.name || 'Unknown Employee'}</span>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{employee?.role || 'Unknown Role'}</span>
                </div>
                
                <div className="flex items-center md:col-span-2">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{appointment.bankBranch}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </CardContent>
            
            {appointment.status === 'scheduled' && (
              <CardFooter className="border-t bg-gray-50 px-6 py-3">
                <div className="flex justify-between w-full">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openDetails(appointment)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => openCancelDialog(appointment)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        );
      })}

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Complete information about your appointment
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <h3 className="font-medium">{findServiceById(selectedAppointment.serviceId)?.name}</h3>
                <p className="text-sm text-gray-500">Appointment ID: {selectedAppointment.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">{selectedAppointment.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm">{selectedAppointment.timeSlot}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Employee</p>
                  <p className="text-sm">{findEmployeeById(selectedAppointment.employeeId)?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm">{findEmployeeById(selectedAppointment.employeeId)?.role}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{selectedAppointment.bankBranch}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Required Documents</p>
                  <ul className="text-sm list-disc list-inside pl-2">
                    {findServiceById(selectedAppointment.serviceId)?.requiredDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedAppointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment?
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{findServiceById(selectedAppointment.serviceId)?.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedAppointment.date} at {selectedAppointment.timeSlot}
                </p>
              </div>

              <p className="text-sm text-red-500">
                This action cannot be undone. Once cancelled, you'll need to book a new appointment.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Keep Appointment
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedAppointment && handleCancelAppointment(selectedAppointment.id)}
            >
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentList;
