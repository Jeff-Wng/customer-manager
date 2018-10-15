import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCardsComponent } from './customers/customer-cards/customer-cards.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { CustomerService } from './customers/customer.service';
import { ProductsComponent } from './products/products.component';
import { ProductCardsComponent } from './products/product-cards/product-cards.component';
import { ProductService } from './products/product.service';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { OrderService } from './orders/order.service';
import { OrderCardsComponent } from './orders/order-cards/order-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersComponent,
    CustomerCardsComponent,
    OrdersComponent,
    CustomerEditComponent,
    OrderEditComponent,
    AuthComponent,
    ProductsComponent,
    ProductCardsComponent,
    ProductEditComponent,
    OrderCardsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataStorageService, AuthService, CustomerService, ProductService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
