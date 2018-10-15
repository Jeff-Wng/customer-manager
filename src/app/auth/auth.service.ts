import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    authForm: FormGroup;
    isLogin: boolean = false;
    token: String;

    isLoginChanged = new ReplaySubject<boolean>();
    errorMessage = new ReplaySubject<String>();
    // Constantly emits updated JWT to subscribed components
    tokenVal = new ReplaySubject<String>();

    constructor(private http: HttpClient, private router: Router) { }
    
    // Create form group for authentication
    createForm() {
      this.authForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, Validators.required)
      })
    }

    onAuth() {
      const data = {
          email: this.authForm.value.email,
          password: this.authForm.value.password
      }
      
      if(!this.isLogin) {
        this.http.post("https://customer-manager-api.herokuapp.com/users/signup/", data)  
        .subscribe(
            data => {
              // User's JWT is stored on localStorage
              localStorage.setItem('token', data['token']);
              this.token = localStorage.getItem('token');
              // Page is redirected to main page after authentication
              this.router.navigate(['/']);
              this.tokenVal.next(this.token);
              this.errorMessage.next(null);
            },
            err => {
              this.errorMessage.next(err.error.message);
            }
        )
      } else if(this.isLogin) {
        this.http.post("https://customer-manager-api.herokuapp.com/users/login/", data)
          .subscribe(
            data => {
              localStorage.setItem('token', data['token']);
              this.token = localStorage.getItem('token');
              this.router.navigate(['/']);
              this.tokenVal.next(this.token);
              this.errorMessage.next(null);
            },
            err => {
              this.errorMessage.next(err.error.message);
            }
          )
      }
    }

    // Changes auth type when user clicks
    changeAuth() {
      this.isLogin = !this.isLogin;
      this.isLoginChanged.next(this.isLogin);
    }

    logout() {
      // JET is removed from localStorage on Log Out
      localStorage.removeItem('token');
      this.token = null;
      this.tokenVal.next(this.token);
    }
}