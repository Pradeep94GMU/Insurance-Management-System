export interface Policy {
    id?: string;
    customerId: string;
    agentId: string;
    policyNumber: string;
    policyType: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
