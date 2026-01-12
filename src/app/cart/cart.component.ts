import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService) {}
  cartItems:any = [];
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartItems = response.data
      },
      error: (err) => {console.log(err)}
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

