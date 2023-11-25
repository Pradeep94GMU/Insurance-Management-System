// customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers'; // Adjust the API endpoint accordingly

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    if (customer.id) {
      return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
    } else {
      return this.http.post<Customer>(this.apiUrl, customer);
    }
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  //for recent users creation
  getRecentUsers(): Observable<any> {
    return this.http.get<any> (this.apiUrl+ '/recent');
  }

  getGenderCounts(): Observable<any[]> {
    const url = `${this.apiUrl}/genders`;
    return this.http.get<any[]>(url);
  }



}
