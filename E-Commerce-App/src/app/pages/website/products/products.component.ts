import { Component, inject, OnInit } from '@angular/core';
import { Icategory } from '../../../core/models/icategory';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../../core/models/iproduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public categoriesNameList: string[] = [];
  public productList!:Iproduct[] 
  public categoryList!:Icategory[]



  private _productService=inject(ProductService)
  private _categoryService=inject(CategoryService)
  private router=inject(Router)

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProduct();
  }

  private getAllCategories(){
    this._categoryService.getCategory()
    .subscribe((data: Icategory[]) => {
      this.categoryList = data;
      this.categoriesNameList = data.map((category: Icategory) => category.categoryName);
      // console.log(this.categoriesNameList);
    });
  }

  private getAllProduct(){
    this._productService.getAllProducts().subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.productList=data;
      }
    })
  }


  public getProductsByCategory(id:number){
    this.router.navigate(['/products',id])
  }
}
