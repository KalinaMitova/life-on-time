import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RegisterUser } from '../models/registerUser';
import { LoginUser } from '../models/loginUser';


const BASE_URL = 'http://136.244.71.69/auth/';
const LOGIN_END_URL = 'login';
const REGISTER_END_URL = 'register';
const LOGOUT_END_URL = 'logout';

@Injectable()
export class AuthService {
  // token: string;

  constructor ( private http: HttpClient ) { }

  registerUser( body: RegisterUser ) {
    return this.http.post( BASE_URL + REGISTER_END_URL, body, {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } ), withCredentials: true
    }
    )
  }

  loginUser( body: LoginUser ) {
    return this.http.post( BASE_URL + LOGIN_END_URL, body, {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } ), withCredentials: true
    } );
  }

  getUsers() {
    return this.http.get( 'http://136.244.71.69/me', {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } ), withCredentials: true
    } );
  }

  logout() {
    return this.http.get( BASE_URL + LOGOUT_END_URL, {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } ), withCredentials: true
    } );
  }

  // getToken() {
  //   return this.token;
  // }

  isAuthenticated() {
    return localStorage.getItem( 'isAuthenticated' ) !== null;
  }
}
