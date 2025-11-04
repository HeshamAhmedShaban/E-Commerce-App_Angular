import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../../core/models/iproduct';
import { ProductService } from '../../../core/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {

  public categoryId:number=0;
  public lastSegment!:string;
  public productsSameCategory:Iproduct[]=[];
  private activatedRoute=inject(ActivatedRoute);
  private _productService=inject(ProductService);
  private router=inject(Router);
  ngOnInit(): void {
      this.getCategoryId();
          const url = this.router.url; // مثال: /products/122341 أو /register_user
    const segments = url.split('/').filter(Boolean); // ['products', '122341']

    if (segments.length > 1) {
      // لو فيه أكتر من جزء زي products/122341
      this.lastSegment = segments[segments.length - 2]; // 'products'
    } else {
      // لو الرابط بسيط زي /register_user
      this.lastSegment = segments[segments.length - 1]; // 'register_user'
    }

    console.log(this.lastSegment);
  }
  public getCategoryId(){
    this.activatedRoute.params.subscribe((res:any)=>{
      this.categoryId=Number(res.id);
      this.getProductSameCategory();
    })
  }

  public getProductSameCategory(){
    this._productService.getAllProducts().pipe(
      map((data:any)=>{
        return data.filter((product:Iproduct)=>product.categoryId==this.categoryId)
      })
    ).subscribe((data:any)=>{
      this.productsSameCategory=data;
      console.log(this.productsSameCategory);
    })
  }


}




