import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApplicationService } from 'app/shared/applications/application.service';

@Component( {
  selector: 'app-choose-plan-page',
  templateUrl: './choose-plan-page.component.html',
  styleUrls: [ './choose-plan-page.component.scss' ]
} )
export class ChoosePlanPageComponent implements OnInit, OnDestroy {

  public applicationTypes: any[];
  private logoutSubscription: Subscription;

  constructor (
    private authService: AuthService,
    private applicationService: ApplicationService,
    private router: Router ) { }

  ngOnInit() {
    this.applicationService.getAplicationTypes()
      .subscribe( data => {
        console.log( data );
        this.applicationTypes = data[ 'data' ];
        console.log( this.applicationTypes );
      } );
  }

  logout() {
    this.logoutSubscription =
      this.authService.logout()
        .subscribe( data => {
          this.authService.deleteToken( 'token' );
          this.router.navigate( [ "/user/login" ] );
        } )
  }

  ngOnDestroy() {
    if ( this.logoutSubscription ) {
      this.logoutSubscription.unsubscribe();
    }
  }

}
