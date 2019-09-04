import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, OnDestroy } from "@angular/core";

import { ROUTES } from './sidebar-routes.config';
import { Router, ActivatedRoute } from "@angular/router";
//import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { GlobalService } from '../services/global.service';

@Component( {
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
} )
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild( 'toggleIcon', { static: false } ) toggleIcon: ElementRef;
  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  private availableCategoriesSubscription: Subscription;
  constructor (
    private router: Router,
    private configService: ConfigService,
    private userService: UserService,
    private globals: GlobalService
    //private elementRef: ElementRef,
    //private renderer: Renderer2,
    //private route: ActivatedRoute,
    //public translate: TranslateService,
  ) {
    if ( this.depth === undefined ) {
      this.depth = 0;
      this.expanded = true;
    }
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.menuItems = ROUTES;
    const goalsMenu = this.menuItems.find( m => m.title === 'My Goals' );
    // const categories = this.globals.getCategory();
    // debugger;
    // console.log( this.globals.getCategory() );
    this.availableCategoriesSubscription = this.userService.getUserAvailableCategories()
      .subscribe( data => {
        this.userService.setCategoriesWindow( data );
        goalsMenu[ 'submenu' ] = [];
        data.forEach( category => {
          goalsMenu[ 'submenu' ].push(
            {
              path: `/goals/${category.pathEnd}`,
              title: category.title,
              icon: '',
              class: '',
              badge: '',
              badgeClass: '',
              isExternalLink: true,
              submenu: []
            }
          )
        } );
      } )

    if ( this.config.layout.sidebar.backgroundColor === 'white' ) {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }


  }

  ngAfterViewInit() {

    setTimeout( () => {
      if ( this.config.layout.sidebar.collapsed != undefined ) {
        if ( this.config.layout.sidebar.collapsed === true ) {
          this.expanded = false;
          // this.renderer.addClass( this.toggleIcon.nativeElement, 'ft-toggle-left' );
          // this.renderer.removeClass( this.toggleIcon.nativeElement, 'ft-toggle-right' );
          this.nav_collapsed_open = true;
        }
        else if ( this.config.layout.sidebar.collapsed === false ) {
          this.expanded = true;
          // this.renderer.removeClass( this.toggleIcon.nativeElement, 'ft-toggle-left' );
          // this.renderer.addClass( this.toggleIcon.nativeElement, 'ft-toggle-right' );
          this.nav_collapsed_open = false;
        }
      }
    }, 0 );


  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle( titles ) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction( path: string ) {
    if ( path.indexOf( "forms/ngx" ) !== -1 )
      this.router.navigate( [ "forms/ngx/wizard" ], { skipLocationChange: false } );
  }

  ngOnDestroy(): void {
    if ( this.availableCategoriesSubscription ) {
      this.availableCategoriesSubscription.unsubscribe();
    }
  }
}
