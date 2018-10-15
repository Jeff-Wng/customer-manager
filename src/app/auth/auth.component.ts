import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLogin: boolean;
  errMessage: String;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.createForm();
    this.authForm = this.authService.authForm;
    // Get current auth type from service and change based on boolean
    this.authService.isLoginChanged.subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    })
    this.authService.errorMessage.subscribe(res => this.errMessage = res);
  }

  onAuth() {
    this.authService.onAuth();
    this.errMessage = null;
  }

  changeAuth() {
    this.authService.changeAuth();
    this.errMessage = null;
  }
}
