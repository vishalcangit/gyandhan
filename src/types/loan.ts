export type LoanType = 'secured' | 'unsecured';

export interface Loan {
  id: string;
  bankName: string;
  loanAmount: number;
  interestRate: number;
  loanType: LoanType;
  tenure: number; // in months
  processingFee: number;
}

