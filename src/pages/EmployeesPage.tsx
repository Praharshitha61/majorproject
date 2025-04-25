
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employees, Employee } from '@/data/employees';
import { UserCheck, UserX, Calendar, Users, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all-roles');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // name, role, availability
  const navigate = useNavigate();
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all-roles' ? true : employee.role === roleFilter;
    const matchesAvailability = showOnlyAvailable ? employee.isAvailable : true;
    
    return matchesSearch && matchesRole && matchesAvailability;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'role') {
      return a.role.localeCompare(b.role);
    } else if (sortBy === 'availability') {
      return (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0);
    }
    return 0;
  });
  
  const uniqueRoles = Array.from(new Set(employees.map(emp => emp.role)));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Employee Availability</h1>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Find Available Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Search by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-roles">All Roles</SelectItem>
                      {uniqueRoles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="role">Sort by Role</SelectItem>
                      <SelectItem value="availability">Sort by Availability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="availableOnly" 
                    checked={showOnlyAvailable} 
                    onCheckedChange={(checked) => setShowOnlyAvailable(!!checked)} 
                  />
                  <Label htmlFor="availableOnly">Show only available employees</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
          
          {filteredEmployees.length === 0 && (
            <div className="text-center p-8 bg-white rounded-md shadow">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No employees found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all-roles');
                  setShowOnlyAvailable(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const navigate = useNavigate();
  
  return (
    <Card className={employee.isAvailable ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{employee.name}</CardTitle>
          {employee.isAvailable ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <UserCheck className="h-3 w-3 mr-1" />
              Available
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <UserX className="h-3 w-3 mr-1" />
              Unavailable
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{employee.role}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Available days:</p>
              <p className="text-sm">{employee.availableDays.join(', ')}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Time slots:</p>
              <p className="text-sm">{employee.availableTimeSlots.join(', ')}</p>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4"
            variant={employee.isAvailable ? "default" : "outline"}
            disabled={!employee.isAvailable}
            onClick={() => navigate('/appointments/new', { state: { employeeId: employee.id } })}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {employee.isAvailable ? 'Book Appointment' : 'Currently Unavailable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeesPage;
