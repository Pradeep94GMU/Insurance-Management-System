// policy.model.ts

export interface Policy {
    id?: string;
    customerId: string;
    agentId: string;
    policyNumber: string;
    policyAmount:string;
    policyType: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  }
  