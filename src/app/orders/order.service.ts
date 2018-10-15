import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerService } from "../customers/customer.service";
import { Customer } from "../customers/customer.model";
import { Order } from "./order.model";
import { ReplaySubject } from "rxjs";

@Injectable()
export class OrderService {
    showModal: Boolean; 
    orderSelected = new ReplaySubject();
    modalTrigger = new ReplaySubject<Boolean>();
    customerSelected = new ReplaySubject();
    selectedCustomer: Customer[];
    private orders: Order[];

    constructor(private http: HttpClient, private customerService: CustomerService) {}

    loadSelectedCustomers() {
        // Subscribe to the current selected customer to get customer specific orders
        this.customerService.customerSelected.subscribe(res => {
            this.selectedCustomer = res;
        })
    }

    loadOrders() {
        this.http.get("https://customer-manager-api.herokuapp.com/orders/" + this.selectedCustomer['id']).subscribe(orderData => {
            this.orders = [];
            for(let i of orderData['orders']) {
                // The API returns the order details and a seperate URL for the product info
                // That URL is called here to gain access to information on the product
                this.http.get(i.productInfo.url).subscribe(productData => {
                    this.orders.push(new Order(i._id, productData['product'].name, Math.round((productData['product'].price * i.quantity) * 100) / 100, i.quantity, 'https://customer-manager-api.herokuapp.com/' + productData['product'].productImage.substring(8)));    
                })
            }
        })
        this.customerSelected.next(this.selectedCustomer);
    }
    
    getOrders() {
        // Returns a copy of the orders array
        return this.orders.slice();
    }

    triggerModal() {
        this.showModal = true;
        this.modalTrigger.next(this.showModal);
    }

    xCloseModal() {
        this.showModal = null;
        this.modalTrigger.next(this.showModal);
    }
    
}




