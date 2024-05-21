import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login_Auth, Register_Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }

  private _url:string='http://localhost:3000/'

  http=inject(HttpClient); 


  public getUsers(){
    return this.http.get(`${this._url}users`)
  }
  public createUser(registerObj:Register_Auth){
    return this.http.post(`${this._url}users`,JSON.stringify(registerObj))
  }

  public loginUser(loginObj:Login_Auth){
    return this.http.post(`${this._url}login`,JSON.stringify(loginObj))
  }
}
