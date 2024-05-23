import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Icart } from '../models/icart';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartUpdated$:Subject<boolean> =new Subject<boolean>()


  private _url:string='http://localhost:3000/';
  private http=inject(HttpClient);

  public getAllCarts(){
    return this.http.get(`${this._url}cart`)
  }


  public addToCartt(obj:Icart){
    return this.http.post(`${this._url}cart`,JSON.stringify(obj))
  }


  public deleteProductFromCart(cartId:string){
    return this.http.delete(`${this._url}cart/${cartId}`)
  }

}
