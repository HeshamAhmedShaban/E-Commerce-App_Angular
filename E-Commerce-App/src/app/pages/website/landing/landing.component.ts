import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Icategory } from '../../../core/models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthUserService } from '../../../core/services/auth-user.service';
import { Icart } from '../../../core/models/icart';
import { CartService } from '../../../core/services/cart.service';
import { Login_Auth } from '../../../core/models/auth';
import { forkJoin, map, switchMap } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  public categoriesNameList!: string[] 

  public isLoggedIn!: boolean;

  public categoryList!:Icategory[];

  public cartUserItems!:Icart[];

  public productsUser!:any[]

  public totalPrice:number=0

  private userData!:Login_Auth;

  private _categoryService=inject(CategoryService);
  private _productService=inject(ProductService)
  private _userSerivce=inject(AuthUserService);
  private _cartService=inject(CartService);
  private router=inject(Router);

  ngOnInit(): void {
    this.getAllCategories();
    this.userState();
    this.getCartItems();
    const data=localStorage.getItem('email');
    if(data !== null){
      this.userData=JSON.parse(data)
      // console.log(this.userData);
    }
    this._cartService.cartUpdated$?.subscribe(res=>{
      if(res) return this.getCartItems();
    })
  }

  private userState(){
    this._userSerivce.getUserState().subscribe({
      next: (state) => {
        this.isLoggedIn = state;
      },
    });
  }

  public logOut(){
    if(this.isLoggedIn){
      this._userSerivce.logout()
    }else {
      this.router.navigateByUrl('/login_user')
    }
  }
  public getAllCategories(){
    this._categoryService.getCategory()
    .subscribe((data: Icategory[]) => {
      this.categoryList = data;
      this.categoriesNameList = data.map((category: Icategory) => category.categoryName);
      // console.log(this.categoriesNameList); 
    });
  }


  public getProductsByCategory(id:number){
    this.router.navigate(['/products',id])
  }

  public regisetPage(){
    this.router.navigateByUrl('/register_user')
  }
  public loginPage(){
    this.router.navigateByUrl('/login_user')
  }

  public getCartItems() {
    this._cartService.getAllCarts().pipe(
      map((data: any) => data.filter((item: Icart) => item.customerEmail === this.userData.email)),
      switchMap((cartItems: Icart[]) => {
        this.cartUserItems = cartItems;
        const productIds = [...new Set(cartItems.map(item => item.productId))];
        return forkJoin(productIds.map(id => this._productService.getProductById(id)));
      })
    ).subscribe(products => {
      this.productsUser = products;
      this.calculateTotalPrice();
      console.log(this.cartUserItems);
      console.log(this.productsUser);
    });
  }

  public deleteProductFromcart(cartId:string){
    this._cartService.deleteProductFromCart(cartId).subscribe(()=>{
      this.cartUserItems=this.cartUserItems.filter(item=>item.id !== cartId );
      // alert('product deleted')
    })
  }


  public calculateTotalPrice() {
    this.totalPrice = this.cartUserItems.reduce((total, item) => {
      const product = this.productsUser.find(p => p.id === item.productId);
      return total + (product ? product.productPrice : 0);
    }, 0);
  }

}





