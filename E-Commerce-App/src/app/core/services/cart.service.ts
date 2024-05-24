import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Icart } from '../models/icart';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  // public cartUpdated$:Subject<boolean> =new Subject<boolean>();

  private catrItemSubject= new BehaviorSubject<Icart[]>([]);

  public cartItems$ = this.catrItemSubject.asObservable();

  public cartUpdated$ = new BehaviorSubject<boolean>(false);


  private _url:string='http://localhost:3000/';
  private http=inject(HttpClient);

  getAllCarts(): Observable<Icart[]> {
    return this.http.get<Icart[]>(`${this._url}cart`).pipe(
      tap(cartItems => this.catrItemSubject.next(cartItems))
    );
  }


  // public addToCartt(obj:Icart){
  //   return this.http.post(`${this._url}cart`,JSON.stringify(obj))
  // }

  // addToCartt(cartItem: Icart): Observable<Icart> {
  //   return this.http.post<Icart>(`${this._url}cart`, JSON.stringify(cartItem)).pipe(
  //     tap(() => {
  //       this.getAllCarts().subscribe(cartItems => {
  //         this.catrItemSubject.next(cartItems);
  //       });
  //       this.cartUpdated$.next(true);
  //     })
  //   );
  // }
  public addToCartt(cartItem: Icart): Observable<Icart> {
    return this.http.post<Icart>(`${this._url}cart`, JSON.stringify(cartItem)).pipe(
      tap(() => {
        this.cartUpdated$.next(true);
      })
    );
  }


  // public deleteProductFromCart(cartId:string){
  //   return this.http.delete(`${this._url}cart/${cartId}`)
  // }

  // public deleteProductFromCart(cartId: string): Observable<void> {
  //   return this.http.delete<void>(`${this._url}cart/${cartId}`).pipe(
  //     tap(() => {
  //       const updatedCart = this.catrItemSubject.value.filter(item => item.id !== cartId);
  //       this.catrItemSubject.next(updatedCart);
  //     })
  //   );
  // }
  public deleteProductFromCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this._url}cart/${cartId}`).pipe(
      tap(() => {
        this.cartUpdated$.next(true);
      })
    );
  }
}
