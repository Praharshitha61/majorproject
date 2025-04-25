
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';

const DashboardPage = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Bank Time Saver</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card className="border-none shadow-custom">
            <CardHeader>
              <CardTitle className="text-xl">
                Welcome to your {user.role === 'customer' ? 'Customer' : 'Employee'} Dashboard
              </CardTitle>
              <CardDescription>
                {user.role === 'customer' 
                  ? 'Manage your bank appointments and services' 
                  : 'Manage your availability and appointments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.role === 'customer' ? <CustomerDashboard /> : <EmployeeDashboard />}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
