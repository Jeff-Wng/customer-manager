import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  @Input() isEdit: Boolean;
  @Output() loadCustomers = new EventEmitter();
  showModal: Boolean;
  genders = ['Male', 'Female'];
  editForm: FormGroup;
  // Placeholder values are needed for the application to compile without errors. Will be replaced with actual data OnInit
  selectedCustomer = {
    'firstName': 'John',
    'lastName': 'Doe',
    'email': 'example@example.com',
    'city': 'New York'
  };
  uploadedImg: File = null;
  token = null;

  constructor(private http: HttpClient, private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('Male'),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl('', Validators.required)
    })
    this.customerService.customerSelected.subscribe(res => {
      this.selectedCustomer = res;
    })
    this.customerService.modalTrigger.subscribe(res => {
      this.showModal = res;
    })
    this.token = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => this.token = res);
  }

  onSubmit() {
    // Certain API are only available for authenticated users
    // HttpHeaders provides the JWT for the API
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': 'bearers ' + this.token
      })
    }
    if(!this.isEdit) {
      // JSON data is normally used to call API
      const data = {
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        gender: this.editForm.value.gender,
        city: this.editForm.value.city,
        state: this.editForm.value.state
      }
      this.http.post("https://customer-manager-api.herokuapp.com/customers/", data, httpHeader).subscribe(res => console.log(res));
    } else {
      // For patch work, FormData is needed for the API
      const data = [
        { "propName": "firstName", "value": this.editForm.value.firstName },
        { "propName": "lastName", "value": this.editForm.value.lastName },
        { "propName": "email", "value": this.editForm.value.email },
        { "propName": "gender", "value": this.editForm.value.gender },
        { "propName": "city", "value": this.editForm.value.city },
        { "propName": "state", "value": this.editForm.value.state }
      ]
      this.http.patch("https://customer-manager-api.herokuapp.com/customers/" + this.selectedCustomer['id'], data, httpHeader).subscribe( res => {
      })
    }
    // After an update is made, customers must be loaded again for updated amount
    this.customerService.loadCustomers();
    this.getCustomers();
    this.editForm.reset();
  }

  closeModal() {
    this.customerService.xCloseModal();
  }

  deleteCustomer() {
    // Delete method is needs authentication for the API.
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': 'bearers ' + this.token
      })
    }
    this.http.delete("https://customer-manager-api.herokuapp.com/customers/" + this.selectedCustomer['id'], httpHeader).subscribe();
    this.closeModal();
  }

  getCustomers() {
    this.loadCustomers.emit();
  }

  onChange(event) {
    this.uploadedImg = event.target.files[0];
  }

}
