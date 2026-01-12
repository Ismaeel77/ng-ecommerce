import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin:boolean = false
  constructor(private _AuthService:AuthService, private _Router:Router) {
    this._AuthService.userInfo.subscribe({
      next: () => {
        if(_AuthService.userInfo.getValue() !== null) {
          this.isLogin = true
        } else {
          this.isLogin = false;
        }
      }
    })
  }

  logout() {
    this._AuthService.logout()
  }

}
