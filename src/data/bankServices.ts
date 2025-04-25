
export interface BankService {
  id: string;
  name: string;
  category: string;
  requiredEmployeeRole: string;
  requiredDocuments: string[];
}

export const bankServices: BankService[] = [
  // Account Services
  {
    id: 'acc-opening',
    name: 'Account Opening (Savings, Current, etc.)',
    category: 'Account Services',
    requiredEmployeeRole: 'Bank Officer / Relationship Manager',
    requiredDocuments: ['ID Proof', 'Address Proof', 'Passport Size Photo', 'PAN Card']
  },
  {
    id: 'acc-closure',
    name: 'Account Closure',
    category: 'Account Services',
    requiredEmployeeRole: 'Branch Manager / Assistant Manager',
    requiredDocuments: ['Account Holder ID Proof', 'Account Closure Form', 'Unused Cheque Book']
  },
  {
    id: 'kyc-update',
    name: 'KYC Update',
    category: 'Account Services',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['Updated ID Proof', 'Updated Address Proof', 'KYC Form']
  },
  
  // Deposit Services
  {
    id: 'fixed-deposit',
    name: 'Fixed Deposit (FD) / Recurring Deposit (RD)',
    category: 'Deposit Services',
    requiredEmployeeRole: 'Bank Officer / Assistant Manager',
    requiredDocuments: ['ID Proof', 'Deposit Form', 'PAN Card']
  },
  {
    id: 'interest-certificate',
    name: 'Interest Certificate Issuance',
    category: 'Deposit Services',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['Account Statement', 'Application for Certificate']
  },
  
  // Loan Services
  {
    id: 'personal-loan',
    name: 'Personal/Business Loan',
    category: 'Loan Services',
    requiredEmployeeRole: 'Loan Officer / Credit Manager',
    requiredDocuments: ['ID Proof', 'Income Proof', 'Bank Statements (6 months)', 'Loan Application']
  },
  {
    id: 'home-loan',
    name: 'Home Loan',
    category: 'Loan Services',
    requiredEmployeeRole: 'Credit Manager / Branch Manager',
    requiredDocuments: ['ID Proof', 'Income Proof', 'Property Documents', 'Loan Application']
  },
  
  // Cheque Services
  {
    id: 'cheque-book',
    name: 'Cheque Book Issuance',
    category: 'Cheque Services',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['Account Details', 'Cheque Book Request Form']
  },
  
  // Card Services
  {
    id: 'card-issuance',
    name: 'Debit / Credit Card Issuance',
    category: 'Card Services',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['ID Proof', 'Card Application Form', 'Passport Size Photo']
  },
  
  // Online & Mobile Banking
  {
    id: 'net-banking',
    name: 'Net Banking Activation',
    category: 'Online & Mobile Banking',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['ID Proof', 'Net Banking Form', 'Mobile Number Verification']
  },
  
  // Government-Linked Services
  {
    id: 'pan-linking',
    name: 'PAN Linking',
    category: 'Government-Linked Services',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['PAN Card', 'Account Details']
  },
  
  // NRI Services
  {
    id: 'nri-account',
    name: 'NRI Account Opening (NRE/NRO)',
    category: 'NRI Services',
    requiredEmployeeRole: 'NRI Relationship Manager',
    requiredDocuments: ['Passport', 'Visa', 'Overseas Address Proof', 'NRI Account Form']
  },
  
  // Locker Services
  {
    id: 'locker-allotment',
    name: 'Locker Allotment',
    category: 'Locker Services',
    requiredEmployeeRole: 'Branch Manager',
    requiredDocuments: ['ID Proof', 'Address Proof', 'Locker Application Form']
  },
  
  // Miscellaneous Services
  {
    id: 'demand-draft',
    name: 'Demand Draft (DD) / Pay Order',
    category: 'Miscellaneous Services',
    requiredEmployeeRole: 'Bank Officer',
    requiredDocuments: ['ID Proof', 'DD Application Form', 'Payment']
  }
];

export const getServicesByCategory = () => {
  const categories: { [key: string]: BankService[] } = {};
  
  bankServices.forEach(service => {
    if (!categories[service.category]) {
      categories[service.category] = [];
    }
    categories[service.category].push(service);
  });
  
  return categories;
};

export const findServiceById = (id: string) => {
  return bankServices.find(service => service.id === id);
};
