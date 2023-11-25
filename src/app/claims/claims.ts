
// claim.model.ts

export interface Claim {
    id?: string;
    policyId: string;
    customerId: string;
    dateOfClaim: Date;
    claimAmount: number;
    status: string;
  }
  