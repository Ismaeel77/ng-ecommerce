import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numberOfCartItems = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.numberOfCartItems.next(response.numOfCartItems)
        console.log(this.numberOfCartItems);

      },
      error: (err) => {console.log(err)}
    })
  }

  addProductToCart(productId:string):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId})
  }

  updateItemCount(productId:string,count:number):Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count})
  }

  getLoggedUserCart():Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeCartItem(productId:string):Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }

  deleteCart():Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  checkoutOrders(shippingAddress:any,cartId:string):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {shippingAddress:shippingAddress}
    )
  }
}
