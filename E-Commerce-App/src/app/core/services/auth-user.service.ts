import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login_Auth, Register_Auth } from '../models/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'; // Correct way to import CryptoJS
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {


  private _url:string='http://localhost:3000/';
  private _secret_Key= "HEsham AHmed"

  private user:BehaviorSubject<boolean>;

  constructor (private http:HttpClient){
    this.user = new BehaviorSubject<boolean>(this.isUserLogged)
  }

  private get isUserLogged(){
    return localStorage.getItem('email') ? true : false ;
  }

  public getUserState():Observable<boolean>{
    return this.user.asObservable();
  }

  public logout(){
    localStorage.removeItem('email');
    this.user.next(false);
  }

  public getUsers():Observable<Register_Auth []>{
    return this.http.get<Register_Auth []>(`${this._url}users`)
  }

  public getUSerByEmailAndPassword(email:string):Observable<Login_Auth[]>{
    return this.http.get<Login_Auth[]>(`${this._url}login?email=${email}`)
  }

  public createUser(registerObj:Register_Auth):Observable<Register_Auth>{
    return this.http.post<Register_Auth>(`${this._url}users`,JSON.stringify(registerObj))
  }

  public loginUser(loginObj:Login_Auth){
    return this.http.post(`${this._url}login`,JSON.stringify(loginObj))
  }


  public encryptPassword(password:any){
    return CryptoJS.AES.encrypt(password,this._secret_Key).toString();
  }
}
