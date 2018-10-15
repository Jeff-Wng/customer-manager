import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {
  @Input() products;
  token = null;
  editPressed = false;
  @Output() editTry = new EventEmitter();

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
  }

  onSelected() {
    // Emits the product selected to subscribed components
    this.productService.productSelected.emit(this.products);
    this.productService.TriggerModal();
  }

  onEditSelected() {
    // User can on edit products if authenticated
    if(this.token !== null) {
      this.onSelected();
      this.productService.isEditModal();
    } else {
      // Else an attempt to edit without authentication will be told to the rest of the application for error message
      this.editPressed = true;
      this.editTry.emit(this.editPressed);
    }
    
  }

}
