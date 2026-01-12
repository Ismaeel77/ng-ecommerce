import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _Router:Router,private _AuthService:AuthService){}
  isLoading:boolean = false;
  apiError:string = '';
  registerForm = new FormGroup({
    name : new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
    email : new FormControl(null,[Validators.required, Validators.email]),
    password : new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword : new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone : new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  handleRegister(registerForm:FormGroup) {
    if(registerForm.valid ) {
      this.isLoading = true
      this._AuthService.register(registerForm.value).subscribe({
        next:(response) => {
          if(response.message === 'success') {
            this.isLoading = false
            this._Router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.apiError = err.error.message
        }
      })
    }


  }

}
