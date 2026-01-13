import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService, private _Router:Router) {}
  cartItems:any = [];
  cartId:string = ''
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartItems = response.data
        this.cartId = response.data._id
      },
      error: (err) => {console.log(err)}
    })
  }

  goToCheckout() {
    this._Router.navigate(['/checkout'],{
      queryParams:{cartId:this.cartId}
    })
  }

  updateCount(productId:string,count:number) {
    this._CartService.updateItemCount(productId,count).subscribe({
      next: (response) => {
        this.cartItems = response.data
        console.log(response.data);
      },
      error: (err) => {console.log(err)}
    })
  }

  removeItem(productId:string) {
    this._CartService.removeCartItem(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.cartItems = response.data;
      },
      error: (err) => {console.log(err)}
    })
  }

  deleteCart() {
    this._CartService.deleteCart().subscribe({
      next: (response) => {
        console.log(response);
        this.cartItems = response.data;
      },
      error: (err) => {console.log(err)}
    })
  }
}

