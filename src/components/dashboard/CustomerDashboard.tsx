
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, UserCheck, FileCheck, Bell, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAppointments } from '@/data/appointments';
import AppointmentList from '@/components/appointments/AppointmentList';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(() => {
    return user ? getUserAppointments(user._id) : [];
  });

  const refreshAppointments = () => {
    if (user) {
      setAppointments(getUserAppointments(user._id));
    }
  };

  useEffect(() => {
    refreshAppointments();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Book Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Link to="/appointments/new">
              <Button className="w-full mt-2 bg-primary hover:bg-secondary">
                Schedule Now
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee Availability</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Link to="/employees">
              <Button variant="outline" className="w-full mt-2 text-primary border-primary hover:bg-primary hover:text-white">
                Check Status
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Checklist</CardTitle>
            <FileCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Link to="/documents">
              <Button variant="outline" className="w-full mt-2 text-primary border-primary hover:bg-primary hover:text-white">
                View Documents
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Link to="/notifications">
              <Button variant="outline" className="w-full mt-2 text-primary border-primary hover:bg-primary hover:text-white">
                View All
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Financial Summary Section - New Feature */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,895.00</div>
            <p className="text-xs text-gray-500 mt-1">Updated: Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,500.00</div>
            <p className="text-xs text-green-500 mt-1">↑ 5.2% this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loans</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,750.00</div>
            <p className="text-xs text-gray-500 mt-1">Next payment: May 15</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-4">Your Upcoming Appointments</h2>
        <AppointmentList 
          appointments={appointments} 
          onAppointmentUpdate={refreshAppointments}
        />
      </div>
    </div>
  );
};

export default CustomerDashboard;
