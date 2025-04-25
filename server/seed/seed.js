
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/Service');
const Employee = require('../models/Employee');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Service.deleteMany({});
    console.log('Services collection cleared');

    // Seed services
    const services = [
      {
        name: 'Account Opening (Savings)',
        category: 'Account Services',
        requiredEmployeeRole: 'Bank Officer',
        requiredDocuments: ['ID Proof', 'Address Proof', 'Passport Size Photo', 'PAN Card'],
        description: 'Open a new savings account with our bank.',
      },
      {
        name: 'Account Opening (Current)',
        category: 'Account Services',
        requiredEmployeeRole: 'Bank Officer',
        requiredDocuments: ['ID Proof', 'Address Proof', 'Business Proof', 'PAN Card', 'GST Registration'],
        description: 'Open a new current account for your business.',
      },
      {
        name: 'Personal Loan',
        category: 'Loan Services',
        requiredEmployeeRole: 'Loan Officer',
        requiredDocuments: ['ID Proof', 'Income Proof', 'Bank Statements (6 months)', 'Loan Application'],
        description: 'Apply for a personal loan with competitive interest rates.',
      },
      {
        name: 'Business Loan',
        category: 'Loan Services',
        requiredEmployeeRole: 'Loan Officer',
        requiredDocuments: ['Business Registration', 'Financial Statements', 'Tax Returns', 'Business Plan'],
        description: 'Get funding for your business growth and operations.',
      },
      {
        name: 'Mortgage',
        category: 'Loan Services',
        requiredEmployeeRole: 'Mortgage Specialist',
        requiredDocuments: ['Property Documents', 'Income Proof', 'ID Proof', 'Bank Statements'],
        description: 'Home loans with flexible repayment options.',
      },
      {
        name: 'Credit Card',
        category: 'Card Services',
        requiredEmployeeRole: 'Credit Card Specialist',
        requiredDocuments: ['ID Proof', 'Income Proof', 'Address Proof'],
        description: 'Apply for credit cards with rewards and cashback benefits.',
      },
      {
        name: 'Wealth Management',
        category: 'Investment Services',
        requiredEmployeeRole: 'Financial Advisor',
        requiredDocuments: ['ID Proof', 'Investment Portfolio', 'Financial Goals Documentation'],
        description: 'Expert advice on managing and growing your wealth.',
      },
      {
        name: 'Insurance',
        category: 'Insurance Services',
        requiredEmployeeRole: 'Insurance Advisor',
        requiredDocuments: ['ID Proof', 'Existing Insurance Details'],
        description: 'Comprehensive insurance solutions for life, health, and property.',
      },
      {
        name: 'Fund Transfer',
        category: 'Transaction Services',
        requiredEmployeeRole: 'Bank Officer',
        requiredDocuments: ['ID Proof', 'Account Details', 'Transfer Details'],
        description: 'Domestic and international fund transfer services.',
      },
      {
        name: 'Fixed Deposit',
        category: 'Deposit Services',
        requiredEmployeeRole: 'Bank Officer',
        requiredDocuments: ['ID Proof', 'Account Details', 'Investment Amount Proof'],
        description: 'Fixed deposit schemes with attractive interest rates.',
      },
    ];

    await Service.insertMany(services);
    console.log('Services seeded successfully');

    // Seed demo employee and customer if they don't exist
    const demoEmployee = await User.findOne({ email: 'employee@demo.com' });
    if (!demoEmployee) {
      const employeeUser = new User({
        email: 'employee@demo.com',
        password: 'password123',
        role: 'employee',
        name: 'Demo Employee',
        phone: '555-1234',
      });
      
      await employeeUser.save();
      console.log('Demo employee user created');
      
      const employee = new Employee({
        userId: employeeUser._id,
        name: 'Demo Employee',
        role: 'Bank Officer',
        isAvailable: true,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableTimeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
      });
      
      await employee.save();
      console.log('Demo employee record created');
    }
    
    const demoCustomer = await User.findOne({ email: 'customer@demo.com' });
    if (!demoCustomer) {
      const customerUser = new User({
        email: 'customer@demo.com',
        password: 'password123',
        role: 'customer',
        name: 'Demo Customer',
        phone: '555-5678',
      });
      
      await customerUser.save();
      console.log('Demo customer created');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

connectDB();
