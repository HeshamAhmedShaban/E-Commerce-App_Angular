import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { BehaviorSubject, concatMap, delay, forkJoin, from, of, tap } from 'rxjs';
interface RouteItem {
  label: string;
  routeLink: string;
  // iconName optional (we use inline svg so string just for clarity)
  icon?: string;
}
@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})


export class ReceiptComponent implements OnInit {


  // public switchMap$ = from([1,2,3,4,5]).pipe(
  //   concatMap(value => {
  //     console.log('Switching to Observable', value);
  //     return of(`Observable value: ${value}`);
  //   })
  // )

  // public forkJoin$ = forkJoin([this.switchMap$,of([1,2])]).pipe(
  //   delay(500)
  // )


  ngOnInit(): void {

  //   // this.switchMap$.subscribe(data => {
  //   //   console.log('Received data', data);
  //   // });


  //   // this.forkJoin$.subscribe(data => {
  //   //   console.log('Received forkJoin data', data);
  //   // });


  //   const arrayy = new BehaviorSubject<number[]>([1,2,3,4,5]);
  //   // arrayy.pipe(
      
  //   //   map(x=>{
  //   //       console.log('x',x);
  //   //       x.map((y)=>console.log('y',y));
  //   //   })

  //   // ).subscribe();

    

  //   const arr = from([1,2,3,4,5]).pipe(
  //     concatMap(x=>of(x).pipe(delay(1000))),
  //     tap(x=>console.log('tap',x))

  //   )

  //   arr.subscribe()

  //   // arr.subscribe(x=>{
  //   //   console.log('x',x);
  //   // })
  }

    // keep collapse control as input/output to integrate with parent
  public isLeftSidebarCollapsed:WritableSignal<boolean> = signal<boolean>(true);
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  // fixed routes (no @Input items)
  public readonly routes: RouteItem[] = [
    { label: 'Dashboard', routeLink: '/dashboard', icon: 'home' },
    { label: 'Products', routeLink: '/products', icon: 'box' },
    { label: 'Orders', routeLink: '/orders', icon: 'orders' },
    { label: 'Settings', routeLink: '/settings', icon: 'settings' },
    { label: 'Profile', routeLink: '/profile', icon: 'profile' },
  ];

  public toggleCollapse(): void {
    this.isLeftSidebarCollapsed.set(!this.isLeftSidebarCollapsed());
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  public closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }


}
