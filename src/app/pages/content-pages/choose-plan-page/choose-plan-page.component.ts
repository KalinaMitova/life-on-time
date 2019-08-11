import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationService } from 'app/shared/applications/application.service';

@Component( {
  selector: 'app-choose-plan-page',
  templateUrl: './choose-plan-page.component.html',
  styleUrls: [ './choose-plan-page.component.scss' ]
} )
export class ChoosePlanPageComponent implements OnInit {

  public applicationTypes: any[];

  constructor (
    private authService: AuthService,
    private applicationService: ApplicationService,
    private router: Router ) { }

  ngOnInit() {
    this.applicationService.getAll()
      .subscribe( data => {
        console.log( data );
        this.applicationTypes = data[ 'data' ];
        console.log( this.applicationTypes );
      } );

    this.applicationService.getAllGoals()
      .subscribe( data => {
        console.log( data );
      } )
  }

  logout() {
    this.authService.logout()
      .subscribe( data => {
        localStorage.removeItem( 'isAuthenticated' );
        this.router.navigate( [ "/user/login" ] );
      } )
  }

}
