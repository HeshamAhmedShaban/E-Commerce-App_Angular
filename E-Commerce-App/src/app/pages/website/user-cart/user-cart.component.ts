import { Component } from '@angular/core';
import { Icart } from '../../../core/models/icart';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {

  cartObj:Icart = {
    customerEmail:'',
    productId:'',
    quantity:null,
    addedDate:new Date ()
  }

}
