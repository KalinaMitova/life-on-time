import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RegisterUser } from '../models/registerUser';
import { LoginUser } from '../models/loginUser';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL = environment.apiUrl + 'auth/';
const LOGIN_END_URL = 'login';
const REGISTER_END_URL = 'register';
const LOGOUT_END_URL = 'logout';

@Injectable()
export class AuthService {

  constructor (
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  registerUser( body: RegisterUser ) {
    return this.http.post( BASE_URL + REGISTER_END_URL, body )
  }

  loginUser( body: LoginUser ) {
    return this.http.post( BASE_URL + LOGIN_END_URL, body, { observe: 'response' } )
  }

  getUsers() {
    return this.http.get( 'me' );
  }

  logout() {
    return this.http.get( BASE_URL + LOGOUT_END_URL )
  }

  getTokenPayload( token ) {

  }

  setCookie( name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "Strict" ): void {
    this.cookieService.set( name, value, expires, path, domain, secure, sameSite );
  }

  getCookie() {
    return this.cookieService.get( 'token' );
  }

  deleteCookie( name: string ) {
    this.cookieService.delete( 'token' );
  }

  isAuthenticated() {
    let cookie = this.cookieService.get( 'token' );
    return this.cookieService.get( 'token' ) !== '';
    //localStorage.getItem( 'isAuthenticated' ) !== null;
  }

  //    {
  //   headers: new HttpHeaders( {
  //     'Content-Type': 'application/json'
  //   } ), withCredentials: true
  // }
}
