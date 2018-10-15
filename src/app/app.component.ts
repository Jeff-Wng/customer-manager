import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customers/customer.service';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { ProductService } from './products/product.service';
import { OrderService } from './orders/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CustomerEditComponent]
})
export class AppComponent implements OnInit{
  title = 'app';
  showBackdrop: Boolean;

  constructor(private customerService: CustomerService, private productService: ProductService, private orderService: OrderService) {}

  ngOnInit() {
    // This holds a backdrop for whenever a modal is showing
    // It is present in this component because the entire application needs to be covered in the backdrop
    // Subscribes to all backdrop and modal related subjects
    this.customerService.modalTrigger.subscribe(res => {
      this.showBackdrop = res;
    });
    this.productService.modalTrigger.subscribe(res => {
      this.showBackdrop = res;
    });
    this.orderService.modalTrigger.subscribe(res => {
      this.showBackdrop = res;
    })
    this.orderService.loadSelectedCustomers();
  }

  closeBackdrop() {
    // Close backdrop effects all types of modals from all components
    this.showBackdrop = false;
    this.customerService.xCloseModal();
    this.productService.xCloseModal();
    this.orderService.xCloseModal();
  }
}
