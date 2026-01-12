import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService:CartService) {}
  allProducts: any[] = [];
  searchTerm:string =''
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },

    });
  }

  addToCart(productId:string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response) => {console.log(response);},
      error: (err) => {console.log(err);}
    })
  }
}
