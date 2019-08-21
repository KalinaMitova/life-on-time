import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )

export class LoginPageComponent implements OnInit {
  ngOnInit(): void {
    throw new Error( "Method not implemented." );
  }

  @ViewChild( 'loginForm', { static: true } ) loginForm: NgForm;

  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService ) { }

  // On submit button click

  login() {
    this.authService
      .loginUser( this.loginForm.value )
      .subscribe( res => {
        const token = res.headers.get( 'token' );
        this.cookieService.set( "token", token, 365, '/' );
        if ( this.loginForm.valid ) {
          this.loginForm.reset();
          //localStorage.setItem( 'isAuthenticated', 'true' )
          this.router.navigate( [ '/progress-dashboard' ] )
        }
      } )
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate( [ 'forgotpassword' ], { relativeTo: this.route.parent } );
  }
  // On registration link click
  onRegister() {
    this.router.navigate( [ 'register' ], { relativeTo: this.route.parent } );
  }
}
