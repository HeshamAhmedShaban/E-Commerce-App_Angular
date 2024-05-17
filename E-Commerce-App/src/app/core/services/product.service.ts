import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../models/icategory';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  _url:string='http://localhost:3000/'

  http=inject(HttpClient);

  public getCategory():Observable<Icategory>{
    return this.http.get<any>(`${this._url}getAllCategories`)
  }

  public getAllProducts(){  
    return this.http.get(`${this._url}getAllProducts`)
  }

  public addProduct(objProduct:Iproduct){
    return this.http.post(`${this._url}getAllProducts`,JSON.stringify(objProduct))
  }

}
