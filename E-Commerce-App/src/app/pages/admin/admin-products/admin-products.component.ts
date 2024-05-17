import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Icategory } from '../../../core/models/icategory';
import { map } from 'rxjs';
import { Iproduct } from '../../../core/models/iproduct';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {

isSidePanelVisable: boolean = false

  productObj:any={
    productSku:'',
    productName:'',
    productPrice:0,
    productShortName:'',
    productDescription:'',
    createdDate:new Date(),
    deliveryTimeSpan:'',
    categoryId:0,
    productImageUrl:'',
  }
  categoryList!:Icategory[]
  productList!:Iproduct[]
  _productService=inject(ProductService)

  ngOnInit(): void {
      this.getAllProducts()
      this.getAllCategories()
  }



  public getAllCategories(){
    this._productService.getCategory().subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.categoryList=data
        // console.log(this.categoryList);
      }
    })
  }

  public getAllProducts(){
    this._productService.getAllProducts().subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.productList=data
      }
    })
  }

  public createProduct(){
    this._productService.addProduct(this.productObj).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getAllProducts()
        alert('Product Added Successfully')
      },
      error:(err:any)=>{
        console.log(err);
        alert('Something went wrong')
      }
    })
  }


  }


