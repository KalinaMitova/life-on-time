import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  //TemplateRef
} from '@angular/core';
//import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ModalService, } from 'app/shared/services/modal.service';
import { Subscription, Observable } from 'rxjs';
//import { LayoutService } from 'app/shared/services/layout.service';
import { ConfigService } from 'app/shared/services/config.service';
import { IdeaService } from 'app/shared/services/idea.service';
import { Idea, IdeaInfo, IdeaFile } from 'app/shared/models/idea';
import { ItemInfo } from 'app/shared/models/itemInfo';
import { EventService } from 'app/shared/services/event.service';
import { GoalCreate } from 'app/shared/models/goalCreate';
import { GoalService } from 'app/shared/services/goal.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
//import { environment } from 'environments/environment';
//import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component(
  {
    selector: 'app-ideas-page',
    templateUrl: './ideas-page.component.html',
    styleUrls: [ './ideas-page.component.scss' ]
  } )
export class IdeasPageComponent implements OnInit, OnDestroy, AfterViewInit {
  [ x: string ]: any;
  @ViewChild( 'emailSidebar', { static: false } ) sidebar: ElementRef;
  @ViewChild( 'contentOverlay', { static: false } ) overlay: ElementRef;
  @ViewChild( 'ideaContent', { static: false } ) content: ElementRef;

  //imageurl: SafeUrl;
  innerWidth: any;
  //dropzone;
  config: any = {};
  ideas: Array<Idea>;
  idea: Idea;
  selectedIdeaId: string;
  isIdeaSelected = true;
  //isIdeaFilesCollapsed = true;
  userId: string;

  // uploadfiles: [];
  // uploadImages: [];
  // fileStartUrl: string;


  private modalCreateSubscription: Subscription;
  private modalDeleteSubscription: Subscription;
  private createGoalSubscription: Subscription;
  private deleteSubscription: Subscription;
  private fileFolderDelSubs: Subscription;
  private createIdeaSub: Subscription;
  private editIdeaSub: Subscription;
  private ideasSub: Subscription;
  private uploadSubs: Subscription;
  //private modalRef: NgbModalRef;


  constructor (
    private elRef: ElementRef,
    private renderer: Renderer2,
    private customModalService: ModalService,
    //private modalService: NgbModal,
    private ideaService: IdeaService,
    private authService: AuthService,
    private configService: ConfigService,
    private eventService: EventService,
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute,
    //public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe( ( params: Params ) => {
        this.selectedIdeaId = params[ 'id' ];
        this.isIdeaSelected = this.selectedIdeaId ? true : false;
      } );
    this.innerWidth = window.innerWidth;
    this.config = this.configService.templateConf;
    this.userId = this.authService.getUserIdFromToken( 'token' );
    //this.fileStartUrl = `${environment.fileUplodeUrl}files/${this.userId}`;
    this.ideasSub = this.ideaService.getUserIdeas()
      .subscribe( data => {
        this.ideas = data;
        const lastIndex = this.ideas.length - 1;
        if ( this.selectedIdeaId ) {
          this.idea = this.ideas.find( i => i.id == this.selectedIdeaId );
        }
        if ( !this.idea ) {
          this.idea = this.ideas[ lastIndex ];
          this.selectedIdeaId = this.idea.id;
          this.isIdeaSelected = true;
        }
        this.selectedIdeaId = this.idea ? this.idea.id : null;
      } );
    this.modalCreateSubscription = this.eventService.on( 'confirm create/edit', ( actionInfo => this.mapAction( actionInfo ) ) );
    this.modalDeleteSubscription = this.eventService.on( 'confirm delete', ( itemInfo => this.mapDelete( itemInfo ) ) );
    this.uploadSubs = this.eventService.on( 'upload success', ( fileInfo => this.addFilesToIdea( fileInfo ) ) );

  }

  private addFilesToIdea( fileInfo ) {
    const uploadInfo: IdeaFile = {
      name: fileInfo.data[ 1 ],
      path: fileInfo.data[ 0 ]
    }
    //TODO upload file's queue
    // const uploadInfo: IdeaFile = {
    //   name: fileInfo[ 1 ],
    //   path: fileInfo[ 0 ]
    //}
    this.editIdeaSub = this.ideaService.putAddFileToIdea( this.selectedIdeaId, uploadInfo )
      .subscribe( data => {
        // this.idea = data[ 'data' ];
        // this.selectedIdeaId = this.idea.id;
        // this.isIdeaSelected = true;
        this.ideasSub = this.ideaService.getUserIdeas()
          .subscribe( data => {
            this.ideas = data;
            this.idea = this.ideas.find( i => i.id == this.selectedIdeaId );
          } );
      } );
  }
  private mapDelete( itemInfo: ItemInfo ) {
    if ( itemInfo.itemType === 'idea' ) {
      this.deleteIdea( itemInfo.itemId );
    } else if ( itemInfo.itemType === 'file' || itemInfo.itemType === 'image' ) {
      this.deleteFileFromIdea( itemInfo.itemId )
    }
  }
  private mapAction( actionInfo ) {
    if ( actionInfo.actionType === 'create' ) {
      if ( actionInfo.itemType === 'goal' ) {
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
          const navigatePath = window.categories.find( c => c.id === goal.category_id ).pathEnd;
          this.router.navigate( [ '/goals', navigatePath ] )
        } )
  }

  private deleteIdea( ideaId: string ) {
    //todo delete files from server
    this.idea.info.files.forEach( f => {
      this.deleteSubscription =
        this.deleteFileFromServer( f.path ).subscribe(
          ( data ) => console.log( data )
        )
    } )
    this.idea.info.images.forEach( i => {
      this.deleteSubscription =
        this.deleteFileFromServer( i.path ).subscribe(
          ( data ) => console.log( data )
        )
    } )
    this.deleteSubscription = this.ideaService.deletIdeaById( ideaId )
      .subscribe( data => {

        this.ideasSub = this.ideaService.getUserIdeas()
          .subscribe( data => {
            this.ideas = data;
            const lastIndex = this.ideas.length - 1;
            this.isIdeaSelected = true;
            this.idea = this.ideas[ lastIndex ];
            this.selectedIdeaId = this.idea.id;
          } );
      } )
  }

  private editIdea( idea: Idea, ideaId: string ) {
    // idea[ 'id' ] = ideaId;
    this.editIdeaSub = this.ideaService.putEditIdeaById( ideaId, idea )
      .subscribe( data => {
        // this.ideas$ = this.ideaService.getUserIdeas();
        this.idea = data[ 'data' ];
        this.ideasSub = this.ideaService.getUserIdeas()
          .subscribe( data => {
            this.ideas = data;
          } );
      } );
  }

  private createIdea( idea: Idea ) {
    idea.info[ 'images' ] = [];
    idea.info[ 'files' ] = [];
    //idea[ 'type' ] = 1;
    this.createIdeaSub = this.ideaService.postCreateIdea( idea )
      .subscribe( data => {
        this.ideasSub = this.ideaService.getUserIdeas()
          .subscribe( data => {
            this.ideas = data;
            this.idea = this.ideas[ this.ideas.length - 1 ];
            this.selectedIdeaId = this.idea.id;
            this.isIdeaSelected = true;
          } );
      } )
  }

  private deleteFileFromServer( fileName: string ): Observable<any> {
    const formData = new FormData();
    formData.append( 'filename', fileName );
    formData.append( 'operation', "delete" );
    formData.append( 'userId', this.userId );
    return this.ideaService.postDeleteFileFromFolder( formData )
  }

  deleteFileFromIdea( fileName: string ) {
    this.fileFolderDelSubs = this.deleteFileFromServer( fileName )
      .subscribe( ( data ) => {
        this.deleteSubscription =
          this.ideaService.deleteFileFromIdea( this.selectedIdeaId, fileName )
            .subscribe( data => {
              this.ideasSub = this.ideaService.getUserIdeas()
                .subscribe( data => {
                  this.ideas = data;
                  this.idea = this.ideas.find( i => i.id == this.selectedIdeaId );
                } );
            } )
      },
        ( error ) => {
          console.log( error );
          alert( error.messages );
        }
      )
  }

  private getDate( dd, mm, yyyy, separator: string ) {
    if ( dd < 10 ) dd = '0' + dd;
    if ( mm < 10 ) mm = '0' + mm;
    return ( yyyy + separator + mm + separator + dd );
  };

  ngAfterViewInit() {
    if ( this.innerWidth < 768 ) {
      if ( this.content ) {
        this
          .renderer
          .addClass( this.content.nativeElement, 'hide-email-content' );
      }
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
    if ( this.ideasSub ) {
      this.ideasSub.unsubscribe();
    }
    if ( this.fileFolderDelSubs ) {
      this.fileFolderDelSubs.unsubscribe();
    }
  }

  //inbox user list click event function
  DisplayIdea( eventPayload ) {
    this.idea = eventPayload.idea;
    this.selectedIdeaId = this.idea.id;
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
    const event = eventPayload.event;
    event
      .currentTarget
      .setAttribute( 'class', 'list-group-item list-group-item-action bg-blue-grey bg-lighten-5 border-right-pr' +
        'imary border-right-2' );

  }

  //compose popup start
  openModal( name: string, itemType: string, actionType: string, item?: any ) {
    this.customModalService.open( name, itemType, actionType, item )
  }

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
    if ( this.content ) {
      this
        .renderer
        .removeClass( this.content.nativeElement, 'hide-email-content' );
    }
  }

  allIdeas() {
    this.renderer.addClass( this.content.nativeElement, 'hide-email-content' );
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
}
