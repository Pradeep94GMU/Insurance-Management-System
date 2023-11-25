// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from './search/search';


@Injectable({
  providedIn: 'root',
})
export class SearchService {

    private baseUrl = 'http://localhost:8080/api/search'; // Update with your Spring Boot API URL
  
    constructor(private http: HttpClient) {}
  
    findAllPaymentsWithCustomerAndPolicy(policyType?: string): Observable<Search[]> {
      const params: { policyTypeFilter?: string } = {};
      if (policyType) {
        params.policyTypeFilter = policyType;
      }
      return this.http.get<Search[]>(`${this.baseUrl}/payments`);
    }
  
    findLatePaymentsWithDetails(): Observable<Search[]> {
      return this.http.get<Search[]>(`${this.baseUrl}/late-payments`);
    }
    findHighValueClaims(): Observable<Search[]> {
      return this.http.get<Search[]>(`${this.baseUrl}/high-value`);
    }

    getHighValueClaims(claimAmountThreshold: number): Observable<Search[]> {
      const params = new HttpParams().set('claimAmountThreshold', claimAmountThreshold.toString());
      return this.http.get<Search[]>(`${this.baseUrl}/high-value`, { params });
    }

    // search query 3rd for high-claim:
    getLatePayments(params: { policyType: string; latePayment: string }): Observable<Search[]> {
      const searchUrl = 'http://localhost:8080/api/search/late-payments';
      return this.http.get<Search[]>(searchUrl, { params });
    }
  }


