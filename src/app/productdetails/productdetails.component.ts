import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  productId: any;
  productDetails: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
    });
  }

}
