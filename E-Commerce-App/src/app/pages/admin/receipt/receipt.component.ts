import { Component, OnInit } from '@angular/core';
import { combineLatest, concatMap, delay, forkJoin, from, mergeMap, of, switchMap } from 'rxjs';

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
  
  }

}
