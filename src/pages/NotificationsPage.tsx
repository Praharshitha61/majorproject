
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar, Clock, User, CheckCircle } from 'lucide-react';

const notifications = [
  {
    id: 'n1',
    title: 'Appointment Confirmed',
    message: 'Your appointment for Account Opening has been confirmed.',
    date: '2025-04-18',
    time: '14:30',
    read: false,
    type: 'appointment'
  },
  {
    id: 'n2',
    title: 'Document Reminder',
    message: 'Please bring your PAN card for your upcoming appointment.',
    date: '2025-04-17',
    time: '09:15',
    read: true,
    type: 'document'
  },
  {
    id: 'n3',
    title: 'Employee Update',
    message: 'John Smith (Branch Manager) is now available for appointments.',
    date: '2025-04-16',
    time: '11:45',
    read: true,
    type: 'employee'
  },
  {
    id: 'n4',
    title: 'Appointment Reminder',
    message: 'Your appointment for Home Loan is scheduled for tomorrow at 3:00 PM.',
    date: '2025-04-15',
    time: '15:00',
    read: false,
    type: 'appointment'
  },
  {
    id: 'n5',
    title: 'Service Update',
    message: 'New service added: Credit Card Limit Increase.',
    date: '2025-04-14',
    time: '10:20',
    read: true,
    type: 'service'
  }
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [userNotifications, setUserNotifications] = React.useState(notifications);
  
  const markAsRead = (id: string) => {
    setUserNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setUserNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const unreadCount = userNotifications.filter(notification => !notification.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Notifications</h1>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Notifications ({unreadCount} unread)
                </CardTitle>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>
          
          <div className="space-y-4">
            {userNotifications.length > 0 ? (
              userNotifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={`${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {notification.type === 'appointment' && <Calendar className="h-4 w-4 mr-2 text-primary" />}
                          {notification.type === 'document' && <FileIcon className="h-4 w-4 mr-2 text-orange-500" />}
                          {notification.type === 'employee' && <User className="h-4 w-4 mr-2 text-green-500" />}
                          {notification.type === 'service' && <Bell className="h-4 w-4 mr-2 text-purple-500" />}
                          
                          <h3 className="font-medium">{notification.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.date} at {notification.time}
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-2"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 bg-white rounded-md shadow">
                <p className="text-gray-500">No notifications to display.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const FileIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export default NotificationsPage;
