import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { debounceTime, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy {
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


  private subject$ = new Subject<boolean>();

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProduct();
    // this.ser();
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
    this._productService.getAllProducts().pipe(takeUntil(this.subject$)).subscribe({
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
    this._cartService.addToCartt(this.cartObj).pipe(takeUntil(this.subject$)).subscribe({
      next: (data: Icart) => {
        alert('Product added');
        this._cartService.cartUpdated$.next(true);
      },
      error: (err: any) => {
        console.log(err);
        alert('Something went wrong');
      }
    });
    // console.log('added');
  }


//   private ser(){
//   //   let inputSearch =document.getElementById('search') as HTMLInputElement
//   //   let serch$=fromEvent<InputEvent>(inputSearch,"input").subscribe({
//   //     next:(event:any)=>{
//   //       console.log(event.target.value);
//   //     }
//   //   })
//   // }
//   const searchInput = document.getElementById('search') as HTMLInputElement;
//   const search$ = fromEvent<InputEvent>(searchInput, 'input')
//     .pipe(
//       debounceTime(3000), // optional: debounce the input to avoid excessive logging
//       map(event => (event.target as HTMLInputElement).value)
//     )
//     .subscribe({
//       next: value => {
//         console.log(value);
//       }
//     });
// }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }

}