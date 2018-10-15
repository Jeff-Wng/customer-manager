import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct = [];
  showErrorMessage = false;
  token = null;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.productService.loadProducts();
    this.getProducts();
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
  }

  getProducts() {
    setTimeout(() => {this.products = this.productService.getProducts();}, 1000);
  }

  triggerModal() {
    this.productService.isNewModal();
  }

  showError() {
    this.showErrorMessage = true;
  }

}
