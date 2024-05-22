import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Icart } from '../models/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _url:string='http://localhost:3000/';
  http=inject(HttpClient);

  public getAllCarts(){
    return this.http.get(`${this._url}cart`)
  }


  public addToCartt(obj:Icart){
    return this.http.post(`${this._url}cart`,JSON.stringify(obj))
  }

}
