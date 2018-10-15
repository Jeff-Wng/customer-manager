import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  jwToken: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Get constant update on current JWT, whether it is present or not
    // JWT variable is used to determine if the user is logged in or not
    // Header will change accordingly, LogOut will be shown instead of LogIn
    this.jwToken = localStorage.getItem('token');
    this.authService.tokenVal.subscribe(res => {
      this.jwToken = res;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
