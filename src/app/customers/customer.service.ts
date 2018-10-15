import { EventEmitter, Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ReplaySubject } from 'rxjs/index';

@Injectable()
export class CustomerService {
    customerSelected = new EventEmitter<Customer>();
    modalTrigger = new ReplaySubject<Boolean>();
    showModal: Boolean;
    private customers: Customer[] = [];

    constructor(private dataStorageService: DataStorageService) {}

    loadCustomers() {
        // SetTimeout is needed to allow time for the application and server to communicate before getting data
        setTimeout(() => {
            this.dataStorageService.getCustomer().subscribe(data => {
                this.customers = [];
                for(let i of data['customers']) {
                    this.customers.push(new Customer(i._id, i.firstName, i.lastName, i.email, 'https://customer-manager-api.herokuapp.com/' + i.profileImg.substring(8), i.city, i.state));
                }
            });
        }, 500);
    }

    getCustomers() {
        // Slice() - return a copy of the array
        return this.customers.slice();
    }

    TriggerModal() {
        this.showModal = true;
        this.modalTrigger.next(this.showModal);
    }

    xCloseModal() {
        this.showModal = null;
        this.modalTrigger.next(this.showModal);
    }
}
