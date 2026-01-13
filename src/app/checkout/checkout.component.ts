import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor( private _CartService:CartService, private _ActivatedRoute:ActivatedRoute){}
    cartId:string = '';

  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe({
      next : ( params ) => {
        console.log(params['cartId']);
        this.cartId = params['cartId'];
      }
    })
  }

  goToPaymentPage(url:string) {
    window.location.href = url;
  }

  handleSubmit(shippingAddress:FormGroup) {

    this._CartService.checkoutOrders(shippingAddress.value,this.cartId).subscribe({
      next: (response) => {
        console.log(response);
        this.goToPaymentPage(response.session.url);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
