import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Category } from './shared/models/category';
import { UserService } from './shared/services/user.service';
declare global {
    interface Window {
        categories: Array<Category>;
    }
}

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    categorySubs: Subscription;

    constructor (
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter( event => event instanceof NavigationEnd )
            )
            .subscribe( () => window.scrollTo( 0, 0 ) );

        this.categorySubs = this.userService.getUserAvailableCategoriesAndUserAppType()
            .subscribe( data => this.userService.setCategoriesWindow( data ) )
    }


    ngOnDestroy() {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
        if ( this.categorySubs ) {
            this.categorySubs.unsubscribe();
        }
    }



}
