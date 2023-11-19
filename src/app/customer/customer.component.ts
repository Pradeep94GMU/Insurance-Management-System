import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  showForm = false;
  customers: Customer[] = [];
  newCustomer: Customer = {
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
  };
  selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
     
      this.newCustomer = {
        id:'',
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
      };
     
     
    });
    this.selectedCustomer = null;
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService
        .updateCustomer(this.selectedCustomer.id!, this.selectedCustomer)
        .subscribe(() => {
          this.loadCustomers();
          this.selectedCustomer = null;
        });
        this.showForm = false;
    }
  }

  deleteCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService
        .deleteCustomer(this.selectedCustomer.id!)
        .subscribe(() => {
          this.loadCustomers();
          this.selectedCustomer = null;
        });
    }
  }


  toggleForm(): void {
    this.showForm = !this.showForm;
    this.selectedCustomer = null; // Deselect any selected customer when toggling the form
  }

}