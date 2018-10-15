import { Component, OnInit } from '@angular/core';
import { Order } from './order.model';
import { CustomerService } from '../customers/customer.service';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isEdit: Boolean;
  Orders: Order[];
  test: Boolean = true;
  showError = false;
  token = null;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.orderService.loadOrders();
    this.getOrders();
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
    console.log(this.token);
  }

  getOrders() {
    // SetTimeout is needed to allow application and server to communicate before extracting data
    setTimeout(() => {
        this.Orders = this.orderService.getOrders();
     }, 1200);
  }

  triggerModal() {
    this.orderService.triggerModal();
  }

  showErrorMessage() {
    this.showError = true;
  }
}
