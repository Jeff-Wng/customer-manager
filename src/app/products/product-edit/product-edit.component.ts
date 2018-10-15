import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Output() loadProducts = new EventEmitter();
  selectedProduct = [];
  showModal: Boolean;
  info: Boolean;
  isEdit: Boolean;
  isNew: Boolean;
  productForm: FormGroup;
  uploadedImg: File = null;
  token = null;

  constructor(private http: HttpClient, private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
    this.productService.productSelected.subscribe(res => {
      this.selectedProduct = res;
    });
    this.productService.modalTrigger.subscribe(res => {
      this.showModal = res;
    });
    // Edit Product, Create New Product and Producty Info uses the same modal
    // Data from the ProductService tells the component if the user selected to Edit or Create New Product
    // Both Info modal and Edit modal uses the isEditTrigger since it is on the same app-product-cards component
    // If isEditTrigger is true, then the user has selected to edit the product
    // If false, the user has selected to see the product info
    this.productService.isEditTrigger.subscribe(res => {
      if(res === true) {
        this.info = false;
        this.isEdit = res;
      } else {
        this.info = true;
        this.isEdit = res;
      }
    })
    // The new product button is on a different component, therefore it has it's own emitter
    // If true, user has selected to create a new product
    // These variables are used in the HTML to determine which form is shown
    this.productService.isNewTrigger.subscribe(res => {
      if(res === true) {
        this.isEdit = false;
        this.info = false; 
        this.isNew = res;
      }
    })
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
  }

  onSubmit() {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Authorization': 'bearers ' + this.token
      })
    }
    if(this.isEdit === true) {
      const data = [
        { "propName": "name", "value": this.productForm.value.name},
        { "propName": "price", "value": this.productForm.value.price},
        { "propName": "description", "value": this.productForm.value.description}
      ]
      const id = this.selectedProduct['id'];
      this.http.patch("https://customer-manager-api.herokuapp.com/products/" + id, data, httpHeaders).subscribe(res => console.log(res));
    } else if(this.isNew === true) {
        const fd = new FormData();
        fd.append('name', this.productForm.value.name);
        fd.append('price', this.productForm.value.price);
        fd.append('description', this.productForm.value.description);
        fd.append('productImage', this.uploadedImg, this.uploadedImg.name);
        this.http.post("https://customer-manager-api.herokuapp.com/products", fd, httpHeaders).subscribe(res => console.log(res));
    }
    this.productService.loadProducts();
    this.getProducts();
    this.productForm.reset();
  }

  closeModal() {
    this.productService.xCloseModal();
  }

  deleteProduct() {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Authorization': 'bearers ' + this.token
      })
    }
    this.http.delete('https://customer-manager-api.herokuapp.com/products/' + this.selectedProduct['id'], httpHeaders).subscribe(res => console.log(res));
    this.productService.loadProducts();
    this.getProducts();
    this.productService.xCloseModal();
  }

  getProducts() {
    this.loadProducts.emit();
  }

  onChange(event) {
    this.uploadedImg = event.target.files[0];
  }
}

