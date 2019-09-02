import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ModalService } from 'app/shared/services/modal.service';
// import { InboxService } from './inbox.service'; import { Mail, Message } from
// './inbox.model'; import { LayoutService } from '../services/layout.service';
import { Subscription, Observable } from 'rxjs';
import { LayoutService } from 'app/shared/services/layout.service';
import { ConfigService } from 'app/shared/services/config.service';
import { IdeaService } from 'app/shared/services/idea.service';
import { Idea } from 'app/shared/models/idea';
import { ItemInfo } from 'app/shared/models/itemInfo';
import { EventService } from 'app/shared/services/event.service';
import { GoalCreate } from 'app/shared/models/goalCreate';
import { GoalService } from 'app/shared/services/goal.service';
import { Router } from '@angular/router';
// import { ConfigService } from '../services/config.service';

@Component( { selector: 'app-ideas-page', templateUrl: './ideas-page.component.html', styleUrls: [ './ideas-page.component.scss' ] } )
export class IdeasPageComponent implements OnInit {

  //--------for upload files ----------
  //public disabled: boolean = false;

  public configDrop: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  //files: File[] = [];

  //--------for upload files ----------

  //placement = "bottom-right";
  public innerWidth: any;

  public config: any = {};
  //layoutSub: Subscription;

  public ideas$: Observable<Array<Idea>>
  public idea: Idea;

  @ViewChild( 'emailSidebar', { static: false } ) sidebar: ElementRef;
  @ViewChild( 'contentOverlay', { static: false } ) overlay: ElementRef;
  @ViewChild( 'ideaContent', { static: false } ) content: ElementRef;

  public selectedIdeaId: string = '1';
  public isCollapsed = true;
  public isCollapsed1 = false;
  public isIdeaSelected = true;

  private modalCreateSubscription: Subscription;
  private modalDeleteSubscription: Subscription;
  private createGoalSubscription: Subscription;
  private deleteSubscription: Subscription;
  private createIdeaSub: Subscription;
  private editIdeaSub: Subscription;
  //private editSubscription: Subscription;


  constructor ( private elRef: ElementRef, private renderer: Renderer2, private modalService: ModalService,
    private ideaService: IdeaService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private eventService: EventService,
    private goalService: GoalService,
    private router: Router ) {
    //this.ideas = this.ideaService.getUserIdeas(); this.layoutSub =
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.config = this.configService.templateConf;
    this.ideas$ = this.ideaService.getUserIdeas();
    this.modalCreateSubscription = this.eventService.on( 'confirm create/edit', ( actionInfo => {
      console.log( actionInfo );
      this.mapAction( actionInfo )
    } ) );
    this.modalDeleteSubscription = this.eventService.on( 'confirm delete', ( itemInfo => this.deleteIdea( itemInfo ) ) );
  }

  private mapAction( actionInfo ) {
    if ( actionInfo.actionType === 'create' ) {
      if ( actionInfo.itemType === 'goal' ) {
        debugger;
        this.createGoal( actionInfo.formValue );
      } else if ( actionInfo.itemType === 'idea' ) {
        this.createIdea( actionInfo.formValue )
      }

    } else if ( actionInfo.actionType === 'edit' ) {
      if ( actionInfo.itemType === 'idea' ) {
        this.editIdea( actionInfo.formValue, actionInfo.itemId );
      }
    }
  }
  private createGoal( formValue ) {
    let goal: GoalCreate = formValue;
    const date = formValue.until_date;
    goal.until_date = this.getDate( date.day, date.month, date.year, '-' );
    goal.category_id = goal[ 'goalCategoryId' ];
    goal[ 'idea_id' ] = this.selectedIdeaId;
    this.createGoalSubscription =
      this.goalService.postCreateGoal( goal )
        .subscribe( data => {
          const navigatePath = window.categories.find( c => c.id = goal.category_id );
          this.router.navigate( [ '/goals', navigatePath ] )
        } )
  }

  private deleteIdea( itemInfo: ItemInfo ) {
    if ( itemInfo.itemType === 'idea' ) {
      this.deleteSubscription = this.ideaService.deletIdeaById( itemInfo.itemId )
        .subscribe( data => {
          this.ideas$ = this.ideaService.getUserIdeas();
        } )
    }
  }
  private editIdea( idea: Idea, ideaId: string ) {
    idea[ 'id' ] = ideaId;
    this.editIdeaSub = this.ideaService.putEditIdeaById( ideaId, idea )
      .subscribe( data => this.ideas$ = this.ideaService.getUserIdeas() );
  }
  private createIdea( idea: Idea ) {
    idea[ 'type' ] = '1';
    idea[ 'user_id' ] = 9;
    this.createIdeaSub = this.ideaService.postCreateIdea( idea )
      .subscribe( data => this.ideas$ = this.ideaService.getUserIdeas() )
  }

  private getDate( dd, mm, yyyy, separator: string ) {
    if ( dd < 10 ) dd = '0' + dd;
    if ( mm < 10 ) mm = '0' + mm;
    return ( yyyy + separator + mm + separator + dd );
  };

  ngAfterViewInit() {
    if ( this.innerWidth < 768 ) {
      this
        .renderer
        .addClass( this.content.nativeElement, 'hide-email-content' );
    }
  }

  ngOnDestroy() {
    if ( this.modalCreateSubscription ) {
      this.modalCreateSubscription.unsubscribe()
    }
    if ( this.modalDeleteSubscription ) {
      this.modalDeleteSubscription.unsubscribe();
    }
    if ( this.createGoalSubscription ) {
      this.createGoalSubscription.unsubscribe();
    }
    if ( this.deleteSubscription ) {
      this.deleteSubscription.unsubscribe();
    }
    if ( this.createIdeaSub ) {
      this.createIdeaSub.unsubscribe();
    }
    if ( this.editIdeaSub ) {
      this.editIdeaSub.unsubscribe();
    }
  }

  //inbox user list click event function
  DisplayIdea( event, idea: Idea ) {
    this.selectedIdeaId = idea.id;
    this.idea = idea;
    this.isIdeaSelected = true;

    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allAnchors = hElement.querySelectorAll( '.users-list-padding > a.list-group-item' );
    //do something with selected elements
    []
      .forEach
      .call( allAnchors, function ( item: HTMLElement ) {
        item.setAttribute( 'class', 'list-group-item list-group-item-action no-border' );
      } );
    //set active class for selected item
    event
      .currentTarget
      .setAttribute( 'class', 'list-group-item list-group-item-action bg-blue-grey bg-lighten-5 border-right-pr' +
        'imary border-right-2' );

  }

  //compose popup start
  openModal( name: string, itemType: string, actionType: string, item?: any ) {
    //let item;
    // if ( idea ) {
    //   item.title = idea.name;
    //   item.description = idea.content ? idea.content : '';
    // }
    this.modalService.open( name, itemType, actionType, item )

  }

  // private getDismissReason( reason: any ): string {
  //   if ( reason === ModalDismissReasons.ESC ) {
  //     return 'by pressing ESC';
  //   } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  //compose popup ends inbox labels click event function
  // GetEmailsByLabel( event, labelType: string ) {
  //   // this.mail = this.inboxService.inbox.filter( ( mail: Mail ) => mail.labelType
  //   // === labelType );
  //   this.SetItemActive( event );
  // }

  // //inbox type click event function
  // GetEmailsByType( event, type: string ) {
  //   // this.mail = this.inboxService.inbox.filter( ( mail: Mail ) => mail.mailType
  //   // === type )
  //   this.SetItemActive( event );
  // }

  // //inbox Starred click event function
  // GetStarredEmails( event ) {
  //   // this.mail = this.inboxService.inbox.filter( ( mail: Mail ) =>
  //   // mail.isImportant === true );
  //   this.SetItemActive( event );
  // }

  SetItemActive( event ) {

    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allAnchors = hElement.querySelectorAll( '.list-group-messages > a.list-group-item' );
    //do something with selected elements
    []
      .forEach
      .call( allAnchors, function ( item: HTMLElement ) {
        item.setAttribute( 'class', 'list-group-item list-group-item-action no-border' );
      } );
    //set active class for selected item
    event
      .currentTarget
      .setAttribute( 'class', 'list-group-item active no-border' );
  }

  @HostListener( 'window:resize', [ '$event' ] )
  onResize( event ) {
    this.innerWidth = window.innerWidth;
    if ( this.innerWidth < 768 ) {
      this
        .renderer
        .addClass( this.content.nativeElement, 'hide-email-content' );
    }
    if ( this.innerWidth > 768 ) {
      this
        .renderer
        .removeClass( this.content.nativeElement, 'hide-email-content' );
    }
  }

  onListItemClick() {
    this
      .renderer
      .removeClass( this.content.nativeElement, 'hide-email-content' );
  }

  onContentOverlay() {
    this
      .renderer
      .removeClass( this.overlay.nativeElement, 'show' );
  }

  onSidebarToggle() {
    this
      .renderer
      .addClass( this.overlay.nativeElement, 'show' );
  }

  //------------------for image upload

  // onSelect( event ) {
  //   console.log( event );
  //   console.log( event.addedFiles );
  //   this
  //     .files
  //     .push( ...event.addedFiles );
  // }

  // onRemove( event ) {
  //   console.log( event );
  //   this
  //     .files
  //     .splice( this.files.indexOf( event ), 1 );
  // }

  public onUploadInit( args: any ): void {
    console.log( args.files[ 0 ] );
    console.log( 'onUploadInit:', args );
  }

  public onUploadError( args: any ): void {
    console.log( 'onUploadError:', args );
  }

  public onUploadSuccess( args: any ): void {
    console.log( 'onUploadSuccess:', args );
  }

  //------------------for image upload
}
