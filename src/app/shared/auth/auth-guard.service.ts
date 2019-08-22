import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor ( private authService: AuthService,
    private router: Router ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    console.log( "Autontecated" + this.authService.isAuthenticated() );
    if ( this.authService.isAuthenticated() ) {
      return true;
    }

    this.router.navigate( [ '/user/login' ] );

    return false;
  }
}
