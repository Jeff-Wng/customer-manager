import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderService } from '../order.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  @Output() getOrders = new EventEmitter();
  selectedCustomer = null;
  showModal: Boolean;
  orderForm: FormGroup;
  token = null;

  constructor(private http: HttpClient, private orderService: OrderService, private authService: AuthService) { }

    ngOnInit() {
      this.orderForm = new FormGroup({
        'productId': new FormControl(null, Validators.required),
        'qty': new FormControl('1', Validators.required)
      })
      this.orderService.customerSelected.subscribe(res => {
        this.selectedCustomer = res;
      })
      this.orderService.modalTrigger.subscribe(res => {
        this.showModal = res;
      })
      this.token = localStorage.getItem('token');
      this.authService.tokenVal.subscribe(res => this.token = res);
  }

  onSubmit() {
    // This API call required authentication
    const httpHeaders = {
      headers: new HttpHeaders({
        'Authorization': 'bearers ' + this.token
      }) 
    }
    const data = {
      customerId: this.selectedCustomer.id,
      product: this.orderForm.value.productId,
      quantity: this.orderForm.value.qty
    }
    this.http.post("https://customer-manager-api.herokuapp.com/orders", data, httpHeaders).subscribe(res => console.log(res));
    setTimeout(() => this.orderService.loadOrders(), 500);
    this.getOrders.emit();
    this.orderService.xCloseModal();
    this.orderForm.reset();
  }

  closeModal() {
    this.orderService.xCloseModal();
  }

}
