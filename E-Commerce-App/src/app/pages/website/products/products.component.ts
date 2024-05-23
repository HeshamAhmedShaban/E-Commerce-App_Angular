import { Component, inject, OnInit } from '@angular/core';
import { Icategory } from '../../../core/models/icategory';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../../core/models/iproduct';
import { Icart } from '../../../core/models/icart';
import { CartService } from '../../../core/services/cart.service';
import { Login_Auth } from '../../../core/models/auth';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public categoriesNameList: string[] = [];
  public productList!:Iproduct[] ;
  public categoryList!:Icategory[];

  cartObj:Icart={
    customerEmail:'',
    productId:'',
    quantity:null,
    addedDate:new Date ()
  }

  userData!:Login_Auth;

  private _productService=inject(ProductService);
  private _categoryService=inject(CategoryService);
  private _cartService=inject(CartService)
  private router=inject(Router);

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProduct();
    const data=localStorage.getItem('email');
    if(data !== null){
      this.userData=JSON.parse(data)
      // console.log(this.userData);
    }
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

  public addTocart(id:string){  
    this.cartObj.customerEmail=this.userData.email;
    this.cartObj.productId=id;
    this.cartObj.quantity=1;
    this._cartService.addToCartt(this.cartObj).subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.getAllProduct();
        alert('Product added');
        this._cartService.cartUpdated$?.next(true);
      },
      error:(err:any)=>{
        console.log(err);
        alert('Something went wrong')
      }
    })
    // console.log('added');
  }
}
