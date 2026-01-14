import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService, private _CartService:CartService) {}
  allProducts: any[] = [];
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response) => {
        this.allProducts = response.data
      },
      error: () => {
      }
    })
  }

  addToCart(id:string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
