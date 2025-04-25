
const express = require('express');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Employee = require('../models/Employee');

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const { userId, serviceId, employeeId, date, timeSlot, bankName, bankBranch } = req.body;

    // Check if user already has a scheduled appointment
    const existingAppointment = await Appointment.findOne({
      userId,
      status: 'scheduled',
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: 'You already have a scheduled appointment. Please complete or cancel it before booking a new one.',
      });
    }

    // Check if the selected time slot is available
    const conflictingAppointment = await Appointment.findOne({
      employeeId,
      date,
      timeSlot,
      status: 'scheduled',
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        message: 'This time slot is no longer available. Please select a different time.',
      });
    }

    const appointment = new Appointment({
      userId,
      serviceId,
      employeeId,
      date,
      timeSlot,
      bankName,
      bankBranch,
    });

    await appointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all appointments for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const appointments = await Appointment.find({ userId })
      .populate('serviceId', 'name category requiredDocuments')
      .populate('employeeId', 'name role')
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointments for an employee
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const appointments = await Appointment.find({ employeeId, status: 'scheduled' })
      .populate('userId', 'name email')
      .populate('serviceId', 'name category')
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment status (cancel/complete)
router.patch('/:appointmentId/status', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    
    if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({
      message: `Appointment ${status} successfully`,
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointment details
router.get('/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    const appointment = await Appointment.findById(appointmentId)
      .populate('serviceId', 'name category requiredDocuments')
      .populate('employeeId', 'name role');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check employee availability
router.get('/check-availability', async (req, res) => {
  try {
    const { employeeId, date, timeSlot } = req.query;
    
    // Check if there's already an appointment at this time
    const conflictingAppointment = await Appointment.findOne({
      employeeId,
      date,
      timeSlot,
      status: 'scheduled',
    });
    
    // Also check if the employee is available on this day/time
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Get day of week from date
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    
    const isAvailable = !conflictingAppointment && 
                        employee.isAvailable && 
                        employee.availableDays.includes(dayOfWeek) &&
                        employee.availableTimeSlots.includes(timeSlot);
    
    res.json({ available: isAvailable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
