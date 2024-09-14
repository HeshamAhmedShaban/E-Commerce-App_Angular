import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, delay, forkJoin, from, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent implements OnInit {


  public switchMap$ = from([1,2,3,4,5]).pipe(
    concatMap(value => {
      console.log('Switching to Observable', value);
      return of(`Observable value: ${value}`);
    })
  )

  public forkJoin$ = forkJoin([this.switchMap$,of([1,2])]).pipe(
    delay(500)
  )


  ngOnInit(): void {

    // this.switchMap$.subscribe(data => {
    //   console.log('Received data', data);
    // });


    // this.forkJoin$.subscribe(data => {
    //   console.log('Received forkJoin data', data);
    // });


    const arrayy = new BehaviorSubject<number[]>([1,2,3,4,5]);
    // arrayy.pipe(
      
    //   map(x=>{
    //       console.log('x',x);
    //       x.map((y)=>console.log('y',y));
    //   })

    // ).subscribe();

    

    const arr = from([1,2,3,4,5]).pipe(
      concatMap(x=>of(x).pipe(delay(1000))),
      tap(x=>console.log('tap',x))

    )

    arr.subscribe()

    // arr.subscribe(x=>{
    //   console.log('x',x);
    // })

  
  }

}
