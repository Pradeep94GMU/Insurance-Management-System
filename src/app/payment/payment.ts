
// payment.model.ts

export interface Payment {
    id?: string;
    policyId: string;
    customerId: string;
    paymentDate: string;
    amountPaid: number;
    isLatePayment: string;
  
}