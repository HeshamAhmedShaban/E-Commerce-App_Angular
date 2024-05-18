import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Icategory } from '../models/icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  _url:string='http://localhost:3000/'

  http=inject(HttpClient);

  public getCategory():Observable<Icategory>{
    return this.http.get<any>(`${this._url}getAllCategories`)
  }

  public deleteCategoryy(id:string):Observable<Icategory>{
    return this.http.delete<Icategory>(`${this._url}getAllCategories/${id}`)
  }
}
