// policy.component.ts

import { Component, OnInit } from '@angular/core';

import { PolicyService } from '../policy.service';
import { Policy } from './policy';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];
  newPolicy: Policy = {
    id:'',
    customerId: '',
    agentId: '',
    policyNumber: '',
    policyAmount:'',
    policyType: '',
    startDate: new Date(),
    endDate: new Date(),
    isActive: false
  };
  selectedPolicy: Policy | null = null;
  showCreate: boolean = false;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getAllPolicies().subscribe((data) => {
      this.policies = data;
    });
  }

  selectPolicy(policy: Policy): void {
    this.selectedPolicy = policy;
  }
  showCreateForm(): void {
    this.showCreate = true;
  }
  createPolicy(): void {
    this.policyService.createPolicy(this.newPolicy).subscribe(() => {
      this.loadPolicies();
      this.newPolicy = {
        id:'',
        customerId: '',
        agentId: '',
        policyNumber: '',
        policyAmount:'',
        policyType: '',
        startDate: new Date(),
        endDate: new Date(),
        isActive: false,
      };
    });
  }

  updatePolicy(): void {
    if (this.selectedPolicy) {
      this.policyService
        .updatePolicy(this.selectedPolicy.id!, this.selectedPolicy)
        .subscribe(() => {
          this.loadPolicies();
          this.selectedPolicy = null;
        });
    }
  }

  deletePolicy(): void {
    if (this.selectedPolicy) {
      this.policyService
        .deletePolicy(this.selectedPolicy.id!)
        .subscribe(() => {
          this.loadPolicies();
          this.selectedPolicy = null;
        });
    }
  }
  cancelUpdate(): void {
    this.selectedPolicy = null;
  }
  cancelCreate(): void {
    this.showCreate = false; // Hide the create form without creating a customer
  }
}
