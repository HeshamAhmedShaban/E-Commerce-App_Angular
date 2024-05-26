import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iorder } from '../models/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _url:string='http://localhost:3000/';
  private http=inject(HttpClient);

  public getAllOrders(){
    return this.http.get(`${this._url}order`);
  };

  public createOrder(order:Iorder){
    return this.http.post(`${this._url}order`,JSON.stringify(order));
  };

}
