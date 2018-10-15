import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  showModal: Boolean;
  isEdit: Boolean;
  token: String;
  showErrorMessage = false;

  constructor(private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit() {
    this.customerService.loadCustomers();
    this.getCustomers();
    this.customerService.modalTrigger.subscribe(res => {
      this.showModal = res;
    })
    this.authService.tokenVal.subscribe(res => this.token = res);
  }

  getCustomers() {
    // SetTimeout is needed to allow the application and server to communicate before extracting data 
    setTimeout(() => this.customers = this.customerService.getCustomers(), 1500);
  }

  triggerModal() {
    this.isEdit = false;
    this.customerService.TriggerModal();
  }

  triggerEditModal() {
    this.isEdit = true;
    this.customerService.TriggerModal();
  }

  showError() {
    this.showErrorMessage = true;
  }
}

