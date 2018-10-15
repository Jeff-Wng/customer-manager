import { EventEmitter, Injectable } from '@angular/core';
import { Product } from './product.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ReplaySubject } from 'rxjs/index';

@Injectable()
export class ProductService {
    productSelected = new EventEmitter<Product>();
    modalTrigger = new ReplaySubject<Boolean>();
    isEditTrigger = new ReplaySubject<Boolean>();
    isNewTrigger = new ReplaySubject<Boolean>();
    showModal: Boolean;
    isEdit: Boolean;
    isNew: Boolean;
    private products: Product[] = [];

    constructor(private dataStorageService: DataStorageService) {}

    loadProducts() {
        // SetTimeout is needed to allow application and server to communicate before extracting data
        setTimeout(() => {
            this.dataStorageService.getProducts().subscribe(data => {
                this.products = [];
                for(let i of data['products']) {
                    this.products.push(new Product(i._id, i.name, i.price, i.description, 'https://customer-manager-api.herokuapp.com/' + i.productImage.substring(8)));
                }
            });
        }, 500);
    }

    getProducts() {
        // Slice() - return a copy of the array
        return this.products.slice();
    }

    TriggerModal() {
        // This is triggered when Product Info is selected
        // isEdit is set to false and emitted
        this.showModal = true;
        this.modalTrigger.next(this.showModal);
        this.isEdit = false;
        this.isEditTrigger.next(this.isEdit);
    }

    xCloseModal() {
        this.showModal = null;
        this.modalTrigger.next(this.showModal);
    }

    isEditModal() {
        // This is triggered when Product Edit is selected
        // isEdit is set to true and emitted
        this.showModal = true;
        this.modalTrigger.next(this.showModal);
        this.isEdit = true;
        this.isEditTrigger.next(this.isEdit);
    }

    isNewModal() {
        // New Product is using a different Subject due to the fact that it is in a serperate componenet
        // And the fact that a Boolean can only hold true or false, no room for a third option
        this.showModal = true;
        this.modalTrigger.next(this.showModal);
        this.isNew = true;
        this.isNewTrigger.next(this.isNew);
    }
}
