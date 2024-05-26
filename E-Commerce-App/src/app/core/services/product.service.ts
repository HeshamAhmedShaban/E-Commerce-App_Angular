import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private _url:string='http://localhost:3000/'

  private http=inject(HttpClient);


  public getAllProducts(){  
    return this.http.get(`${this._url}getAllProducts`)
  }

  public getProductById(id:string){
    return this.http.get(`${this._url}getAllProducts/${id}`)
  }

  public addProduct(objProduct:Iproduct){
    return this.http.post(`${this._url}getAllProducts`,JSON.stringify(objProduct))
  }

  public updateProductt(objProduct:Iproduct){
    return this.http.put(`${this._url}getAllProducts/${objProduct.id}`,JSON.stringify(objProduct))
  }

  public deleteProductt(id:string){
    return this.http.delete(`${this._url}getAllProducts/${id}`)
  }

}
