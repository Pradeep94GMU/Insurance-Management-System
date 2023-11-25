// claim.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from './claims/claims';
import { ClaimStatusCount } from './claims/claim-status-count';


@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  private apiUrl = 'http://localhost:8080/api/claims'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }

  getClaimById(id: string): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }

  createClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }

  updateClaim(id: string, claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${id}`, claim);
  }

  deleteClaim(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getClaimStatusCounts(): Observable<ClaimStatusCount[]> {
    return this.http.get<ClaimStatusCount[]>(`${this.apiUrl}/statusCounts`);
  }
}
