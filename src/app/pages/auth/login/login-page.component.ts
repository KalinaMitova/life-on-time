import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )

export class LoginPageComponent {

  @ViewChild( 'loginForm', { static: true } ) loginForm: NgForm;

  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute ) { }

  // On submit button click

  login() {
    console.log( this.loginForm.value );
    this.authService
      .loginUser( this.loginForm.value )
      .subscribe( data => {
        console.log( data );
        this.authService.getUsers().subscribe( d => console.log( d ) )
        // this.authService.saveUserInfo( data );
        if ( this.loginForm.valid ) {
          this.loginForm.reset();
          localStorage.setItem( 'isAuthenticated', 'true' )
          this.router.navigate( [ '/chooseplan' ] )
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
