import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient) {}
    // HttpClient calls .json() automatically

    getCustomer() {
        // Initial call to get all customers is made
        // This is called in the various services
        return this.http.get("https://customer-manager-api.herokuapp.com/customers").pipe(map(res => {
            return res;
        }))
    }

    getProducts() {
        // Initial call to get all products is made
        // This is called in the various services
        return this.http.get("https://customer-manager-api.herokuapp.com/products").pipe(map(res => {
            return res;
        }))
    }
}