import { Component, inject } from '@angular/core';
import { Register_Auth } from '../../../core/models/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../core/services/auth-user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  public registerUser:Register_Auth = {
    custID: 0,
    firstName:'',
    lastName:'',
    email:'',
    mobileNumber:null,
    password: '',
  }

  private router=inject(Router);
  private _authService=inject(AuthUserService);


  public register(){
    this._authService.createUser(this.registerUser).subscribe({
      next:()=>{
        alert('Registration successfully Go to Login')
        this.router.navigateByUrl('/login_user');
      },
      error:(err)=>{
        console.log(err.error.message);
        
      }
  });
  }

}
