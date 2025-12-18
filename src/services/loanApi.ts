import {Loan} from '../types';

// Mock data simulating API response
const MOCK_LOANS: Loan[] = [
  {
    id: '1',
    bankName: 'State Bank of India',
    loanAmount: 2500000,
    interestRate: 8.5,
    loanType: 'secured',
    tenure: 84,
    processingFee: 10000,
  },
  {
    id: '2',
    bankName: 'HDFC Bank',
    loanAmount: 3000000,
    interestRate: 9.25,
    loanType: 'unsecured',
    tenure: 60,
    processingFee: 15000,
  },
  {
    id: '3',
    bankName: 'ICICI Bank',
    loanAmount: 2000000,
    interestRate: 8.75,
    loanType: 'secured',
    tenure: 72,
    processingFee: 8500,
  },
  {
    id: '4',
    bankName: 'Axis Bank',
    loanAmount: 1500000,
    interestRate: 10.5,
    loanType: 'unsecured',
    tenure: 48,
    processingFee: 12000,
  },
  {
    id: '5',
    bankName: 'Punjab National Bank',
    loanAmount: 2800000,
    interestRate: 8.25,
    loanType: 'secured',
    tenure: 96,
    processingFee: 7500,
  },
  {
    id: '6',
    bankName: 'Bank of Baroda',
    loanAmount: 2200000,
    interestRate: 9.0,
    loanType: 'secured',
    tenure: 60,
    processingFee: 9000,
  },
  {
    id: '7',
    bankName: 'Kotak Mahindra Bank',
    loanAmount: 1800000,
    interestRate: 11.0,
    loanType: 'unsecured',
    tenure: 36,
    processingFee: 18000,
  },
];

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchLoans(): Promise<Loan[]> {
  // Simulate API call with network delay
  await delay(1500);

  // Uncomment below to test error handling
  // throw new Error('Failed to fetch loans');

  return MOCK_LOANS;
}

