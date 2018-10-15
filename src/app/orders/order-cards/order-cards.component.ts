import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderService } from '../order.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-cards',
  templateUrl: './order-cards.component.html',
  styleUrls: ['./order-cards.component.css']
})
export class OrderCardsComponent implements OnInit {
  @Input() order: Order
  @Output() getOrders = new EventEmitter();
  token = null;
  tryDelete = false;
  @Output() deleteTry = new EventEmitter();

  constructor(private http: HttpClient, private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
  }
  
  onDeleteOrder() {
    // User can only attempt to delete an order if they are an authenticated user
    if(this.token !== null) {
      const httpHeaders = {
        headers: new HttpHeaders({
          'Authorization': 'bearers ' + this.token
        })
      }
      this.http.delete('https://customer-manager-api.herokuapp.com/orders/' + this.order.id, httpHeaders).subscribe(res => console.log(res));
      setTimeout(() => this.orderService.loadOrders(), 1000);
      this.getOrders.emit();
    } else {
      // If not authenticated, the attempt will be told to other components for an error message
        this.tryDelete = true;
        this.deleteTry.emit(this.tryDelete);
    } 
  }
}