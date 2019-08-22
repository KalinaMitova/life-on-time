import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )

export class LoginPageComponent implements OnDestroy {
  @ViewChild( 'loginForm', { static: true } ) loginForm: NgForm;

  private loginSubscription: Subscription;

  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute ) { }

  // On submit button click

  login() {
    this.loginSubscription = this.authService
      .loginUser( this.loginForm.value )
      .subscribe( data => {
        //token in headers
        // const token = res.headers.get( 'token' );
        console.log( data[ 'data' ].token );
        this.authService.setToken( data[ 'data' ].token );
        //-----------logic with token saved in cookie starts-----------
        // const tokenExp = this.authService.getTokenExp( token );
        // this.authService.setCookie( 'token', token, tokenExp, '/' );
        //-----------logic with token saved in cookie starts-----------
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

  ngOnDestroy(): void {
    if ( this.loginSubscription ) {
      this.loginSubscription.unsubscribe();
    }
  }
}
