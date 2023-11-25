// claim.component.ts

import { Component, OnInit } from '@angular/core';
import { Claim } from './claims';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
})
export class ClaimsComponent implements OnInit {
  claims: Claim[] = [];
  newClaim: Claim = {
    id:'',
    policyId: '',
    customerId: '',
    dateOfClaim: new Date(),
    claimAmount: 0,
    status: '',
  };
  selectedClaim: Claim | null = null;
  showCreate: boolean = false;


  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getAllClaims().subscribe((data) => {
      this.claims = data;
    });
  }
  

  selectClaim(claim: Claim): void {
    this.selectedClaim = claim;
  }
  showCreateForm(): void {
    this.showCreate = true;
  }

  createClaim(): void {
    this.claimService.createClaim(this.newClaim).subscribe(() => {
      this.loadClaims();
      this.newClaim = {
        id:'',
        policyId: '',
        customerId: '',
        dateOfClaim: new Date(),
        claimAmount: 0,
        status: '',
      };
    });
  }

  updateClaim(): void {
    if (this.selectedClaim) {
      this.claimService.updateClaim(this.selectedClaim.id!, this.selectedClaim).subscribe(() => {
        this.loadClaims();
        this.selectedClaim = null;
      });
    }
  }

  deleteClaim(): void {
    if (this.selectedClaim) {
      this.claimService.deleteClaim(this.selectedClaim.id!).subscribe(() => {
        this.loadClaims();
        this.selectedClaim = null;
      });
    }
  }
  cancelUpdate(): void {
    this.selectedClaim = null;
  }
  cancelCreate(): void {
    this.showCreate = false; // Hide the create form without creating a customer
  }
  
}

