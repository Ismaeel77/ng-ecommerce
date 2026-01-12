import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) {

    if (localStorage.getItem('userToken') !== null) {
      this.decodedUserData()
    }

  }

  userInfo = new BehaviorSubject(null);

  decodedUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    console.log(decodedToken);
    this.userInfo.next(decodedToken);

  }

  register(userData:object):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
  }

  login(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }

  logout() {
    this.userInfo.next(null);
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
  }

}
