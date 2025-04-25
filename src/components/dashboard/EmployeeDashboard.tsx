
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { employees, updateEmployeeAvailability } from '@/data/employees';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Bank Officer');
  
  // Mock employee ID based on user email
  const employeeId = user?.email ? 'emp' + user.email.charCodeAt(0).toString() : 'emp1';
  
  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    
    // Update employee availability in our mock data
    if (employeeId) {
      updateEmployeeAvailability(employeeId, checked);
      toast(checked ? 'You are now available for appointments' : 'You are now marked as unavailable');
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Availability Status</CardTitle>
          <CardDescription>
            Set your current availability for customer appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch 
              id="available" 
              checked={isAvailable} 
              onCheckedChange={handleAvailabilityChange} 
            />
            <Label htmlFor="available">I am {isAvailable ? 'available' : 'not available'} for appointments</Label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Role</CardTitle>
          <CardDescription>
            Select your current role at the bank
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bank Officer">Bank Officer</SelectItem>
              <SelectItem value="Assistant Manager">Assistant Manager</SelectItem>
              <SelectItem value="Branch Manager">Branch Manager</SelectItem>
              <SelectItem value="Loan Officer">Loan Officer</SelectItem>
              <SelectItem value="Credit Manager">Credit Manager</SelectItem>
              <SelectItem value="Relationship Manager">Relationship Manager</SelectItem>
              <SelectItem value="NRI Relationship Manager">NRI Relationship Manager</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full mt-4 bg-primary hover:bg-secondary" onClick={() => toast('Role updated successfully')}>
            Update Role
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>
            You have 2 appointments scheduled for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Account Opening - 10:00 AM</p>
              <p className="text-sm text-gray-500">Customer: John Doe</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Loan Application - 2:00 PM</p>
              <p className="text-sm text-gray-500">Customer: Jane Smith</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
