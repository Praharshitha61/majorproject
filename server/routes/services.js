
const express = require('express');
const Service = require('../models/Service');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ category: 1, name: 1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get services by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category }).sort({ name: 1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed services data (for initial setup)
router.post('/seed', async (req, res) => {
  try {
    // Sample services data
    const servicesData = [
      {
        name: 'Account Opening (Savings, Current, etc.)',
        category: 'Account Services',
        requiredEmployeeRole: 'Bank Officer / Relationship Manager',
        requiredDocuments: ['ID Proof', 'Address Proof', 'Passport Size Photo', 'PAN Card'],
      },
      {
        name: 'Account Closure',
        category: 'Account Services',
        requiredEmployeeRole: 'Branch Manager / Assistant Manager',
        requiredDocuments: ['Account Holder ID Proof', 'Account Closure Form', 'Unused Cheque Book'],
      },
      {
        name: 'Personal/Business Loan',
        category: 'Loan Services',
        requiredEmployeeRole: 'Loan Officer / Credit Manager',
        requiredDocuments: ['ID Proof', 'Income Proof', 'Bank Statements (6 months)', 'Loan Application'],
      },
      {
        name: 'Home Loan',
        category: 'Loan Services',
        requiredEmployeeRole: 'Credit Manager / Branch Manager',
        requiredDocuments: ['ID Proof', 'Income Proof', 'Property Documents', 'Loan Application'],
      },
      {
        name: 'Cheque Book Issuance',
        category: 'Cheque Services',
        requiredEmployeeRole: 'Bank Officer',
        requiredDocuments: ['Account Details', 'Cheque Book Request Form'],
      },
    ];
    
    // Clear existing services
    await Service.deleteMany({});
    
    // Insert new services
    await Service.insertMany(servicesData);
    
    res.status(201).json({
      message: 'Services data seeded successfully',
      count: servicesData.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
