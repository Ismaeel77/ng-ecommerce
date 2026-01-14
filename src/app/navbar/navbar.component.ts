import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin:boolean = false
  cartItems:number = 0;
  constructor(private _AuthService:AuthService, private _CartService:CartService) {
    this._CartService.numberOfCartItems.subscribe({
      next: (value) => {this.cartItems = value},
      error: (err) => {console.log(err)}
    })
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
