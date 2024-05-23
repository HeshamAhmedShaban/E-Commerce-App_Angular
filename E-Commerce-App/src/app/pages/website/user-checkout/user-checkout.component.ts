import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iorder } from '../../../core/models/iorder';
import { Icart } from '../../../core/models/icart';
import { Login_Auth } from '../../../core/models/auth';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-checkout.component.html',
  styleUrl: './user-checkout.component.css'
})
export class UserCheckoutComponent implements OnInit {

  public cartUserItems!:Icart[];

  public productsUser!:any[]

  public totalPrice:number=0

  private userData!:Login_Auth;

  isApiCallInProgress: boolean = false;
  
  checkoutObj:Iorder ={
    city:'',
    email:'',
    pinCode:'',
    firstAddress:'',
    secondAddress:'',
    landMark:'',
    paymentNaration:'',
    cart:[],
    totalPrice:null,
    totalItems:null
  } 
  private _productService=inject(ProductService)
  private _cartService=inject(CartService);

  ngOnInit(): void {
    this.getCartItems();
    const data=localStorage.getItem('email');
    if(data !== null){
      this.userData=JSON.parse(data)
      this.checkoutObj.email=this.userData.email;
    }
    this._cartService.cartUpdated$?.subscribe(res=>{
      if(res) return this.getCartItems();
    })
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
