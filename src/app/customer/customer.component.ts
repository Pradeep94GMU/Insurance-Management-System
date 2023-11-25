import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../customer.service';
import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = {
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    age:'',
    gender:'',
    createDate:''
  };
  selectedCustomer: Customer | null = null;
  showCreate: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }
  
  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      console.log("id print1")
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log("id print2")
  }
  showCreateForm(): void {
    this.showCreate = true;
  }

  createCustomer(): void {
    console.log("id print create")
    this.customerService.createCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
      this.newCustomer = {
        id:'',
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        age:'',
        gender:'',
        createDate:'',
      };
    });
    this.selectedCustomer=null;
    this.showCreate=false;
    console.log("id print create end")
  }
  cancelCreate(): void {
    this.showCreate = false; // Hide the create form without creating a customer
  }
  cancelUpdate(): void {
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
}


