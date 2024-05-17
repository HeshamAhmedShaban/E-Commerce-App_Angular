import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    userName:'admin',
    password:'admin'
  }

  router=inject(Router)



  public login(){
    if(this.loginObj.userName == 'admin' && this.loginObj.password == 'admin'){
this.router.navigateByUrl('/products')
    }else{
    alert('invalid user name or password')
    }
  }
}
