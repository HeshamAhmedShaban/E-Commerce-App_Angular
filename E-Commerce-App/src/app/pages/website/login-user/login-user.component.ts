import { Component, inject } from '@angular/core';
import { Login_Auth, Register_Auth } from '../../../core/models/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../core/services/auth-user.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {

  public loginUser:Login_Auth = {
    email:'',
    password: '',
  }

  public usersList!:Register_Auth[]

  private router=inject(Router);
  private _authService=inject(AuthUserService);


  public login(){
    if(this.loginUser.email && this.loginUser.password){
      this._authService.getUsers().subscribe({
        next:(data:any)=>{  
          this.usersList=data;
          let isExistingUser= this.usersList.find(user=>user.email==this.loginUser.email);
          if(isExistingUser){
            if(isExistingUser.email === this.loginUser.email && isExistingUser.password === this.loginUser.password){
              let loginUser= {
                email:isExistingUser.email,
                password:isExistingUser.password
              };
              this._authService.loginUser(loginUser).subscribe({
                next:()=>{
                  this.router.navigate(['/allProducts']);
                },
                error:()=>{
                  alert('invalid email or password');
                }
              })
          } else {
            alert('invalid email or password');
          }
        }
      },
      });
    }
  }
}
