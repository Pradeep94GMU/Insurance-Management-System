export interface Search {

  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerAge:string;
  customerEmail: string;
  customerDateOfBirth: Date;
  customerPhoneNumber: string;

  policyId: string;
  policyNumber: string;
  policyType: string;
  policyStartDate: Date;
  policyEndDate: Date;
  policyActive: boolean;

  paymentId: string;
  paymentDate: Date;
  amountPaid: number;
  latePayment: boolean;

  claimId: string;
  claimAmount: number;
  policyTypeFilter?: string;

}