import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/auth/auth.service';
import { RegisterUser } from 'app/shared/models/registerUser';


@Component( {
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [ './register-page.component.scss' ]
} )

export class RegisterPageComponent {
  @ViewChild( 'registerForm', { static: false } ) registerForm: NgForm;
  private user: RegisterUser;

  constructor (
    private authService: AuthService,
    private router: Router
  ) { }
  //  On submit click, reset field value
  register() {

    this.user = this.registerForm.value;
    console.log( this.registerForm );
    this.authService
      .registerUser( this.user )
      .subscribe( ( data ) => {
        console.log( data );
        if ( this.registerForm.valid ) {
          this.registerForm.reset();
          this.router.navigate( [ '/user/login' ] );
        }
      } )
  }
}
