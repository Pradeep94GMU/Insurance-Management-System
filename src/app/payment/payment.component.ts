// payment.component.ts

import { Component, OnInit } from '@angular/core';


import { Payment } from './payment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  selectedPayment: Payment | null = null;
  newPayment: Payment = {
    id:'',
    policyId: '',
    customerId: '',
    paymentDate: '',
    amountPaid: 0,
    isLatePayment: '',
  };
  selectedCustomer: Payment | null = null;
  showCreate: boolean = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe((payments) => {
      this.payments = payments;
    });
  }

  selectPayment(payment: Payment): void {
    this.selectedPayment = payment;
  }
  showCreateForm(): void {
    this.showCreate = true;
  }


  updatePayment(): void {
    if (this.selectedPayment) {
      this.paymentService
        .updatePayment(this.selectedPayment.id!, this.selectedPayment)
        .subscribe(() => {
          this.loadPayments();
          this.selectedPayment = null;
        });
    }
  }

  deletePayment(): void {
    if (this.selectedPayment) {
      this.paymentService
        .deletePayment(this.selectedPayment.id!)
        .subscribe(() => {
          this.loadPayments();
          this.selectedPayment = null;
        });
    }
  }

  createPayment(): void {
    this.paymentService.createPayment(this.newPayment).subscribe(() => {
      this.loadPayments();
      this.newPayment = {
        id:'',
        policyId: '',
        customerId: '',
        paymentDate: '',
        amountPaid: 0,
        isLatePayment: '',
      };
    });
  }
  cancelCreate(): void {
    this.showCreate = false; // Hide the create form without creating a customer
  }
  cancelUpdate(): void {
    this.selectedPayment = null;
  }
}
