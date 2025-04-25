
const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({ isAvailable: true });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employees by role
router.get('/role/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const employees = await Employee.find({
      role: { $regex: role, $options: 'i' },
      isAvailable: true,
    });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const { isAvailable, availableDays, availableTimeSlots } = req.body;
    
    // Build update object based on what was provided
    const updateObj = {};
    if (isAvailable !== undefined) updateObj.isAvailable = isAvailable;
    if (availableDays) updateObj.availableDays = availableDays;
    if (availableTimeSlots) updateObj.availableTimeSlots = availableTimeSlots;
    
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({
      message: 'Employee availability updated successfully',
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee role
router.patch('/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({
      message: 'Employee role updated successfully',
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
