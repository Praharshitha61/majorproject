
# Bank Time Saver - Backend

This is the backend API for the Bank Time Saver application, a platform for scheduling bank appointments.

## Setup Instructions

1. Install MongoDB locally or use MongoDB Atlas
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bankTimeServer
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/profile - Get current user profile

### Appointments
- POST /api/appointments - Create a new appointment
- GET /api/appointments/user/:userId - Get all appointments for a user
- GET /api/appointments/employee/:employeeId - Get appointments for an employee
- PATCH /api/appointments/:appointmentId/status - Update appointment status
- GET /api/appointments/:appointmentId - Get appointment details

### Employees
- GET /api/employees - Get all employees
- GET /api/employees/role/:role - Get employees by role
- GET /api/employees/:id - Get employee by ID
- PATCH /api/employees/:id/availability - Update employee availability
- PATCH /api/employees/:id/role - Update employee role

### Services
- GET /api/services - Get all services
- GET /api/services/category/:category - Get services by category
- GET /api/services/:id - Get service by ID
- POST /api/services/seed - Seed services data (for initial setup)
