import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-customer-cards',
  templateUrl: './customer-cards.component.html',
  styleUrls: ['./customer-cards.component.css']
})
export class CustomerCardsComponent implements OnInit {
  @Input() customer: Customer;
  @Output() triggerEditModal = new EventEmitter();
  editPressed = false;
  @Output() editTry = new EventEmitter();
  token = null;

  constructor(private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
  }

  emitSelectedCustomer() {
    this.customerService.customerSelected.emit(this.customer);
  }

  editCustomer() {
    // If JWT is present, emit the current customer to subscribed components
    // Trigger the modal and tell the other components as well
    if(this.token !== null) {
      this.emitSelectedCustomer();
      this.customerService.TriggerModal();
      this.triggerEditModal.emit();
    } else {
      // If JWT is not present, tell components that an attempted to edit the customer was made
      this.editPressed = true;
      this.editTry.emit(this.editPressed);
    }
  }
}
