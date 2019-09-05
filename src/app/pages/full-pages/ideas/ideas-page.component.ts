import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';

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
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { environment } from 'environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  dropzone;
  config: any = {};
  ideas: Array<Idea>;
  idea: Idea;
  selectedIdeaId: string;
  isIdeaSelected = true;
  isIdeaImagesCollapsed = true;
  isIdeaFilesCollapsed = true;
  isImages = true;
  userId: string;
  closeResult: string;
  configFileDrop: DropzoneConfigInterface = {
    acceptedFiles: '.pdf, .doc, .docx, .rtf',
    //filesizeBase: number;
  };

  configImageDrop: DropzoneConfigInterface = {
    acceptedFiles: 'image/*'
  };
  uploadfiles: [];
  uploadImages: [];
  fileStartUrl: string;


  private modalCreateSubscription: Subscription;
  private modalDeleteSubscription: Subscription;
  private createGoalSubscription: Subscription;
  private deleteSubscription: Subscription;
  private fileFolderDelSubs: Subscription;
  private createIdeaSub: Subscription;
  private editIdeaSub: Subscription;
  private ideasSub: Subscription;
  private modalRef: NgbModalRef;


  constructor (
    private elRef: ElementRef,
    private renderer: Renderer2,
    private customModalService: ModalService,
    private modalService: NgbModal,
    private ideaService: IdeaService,
    private authService: AuthService,
    private configService: ConfigService,
    private eventService: EventService,
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
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
    this.fileStartUrl = `${environment.fileUplodeUrl}files/${this.userId}`
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
    this.modalCreateSubscription = this.eventService.on( 'confirm create/edit', ( actionInfo => {
      console.log( actionInfo );
      this.mapAction( actionInfo )
    } ) );
    this.modalDeleteSubscription = this.eventService.on( 'confirm delete', ( itemInfo => this.deleteIdea( itemInfo ) ) );
    // this.imageurl = this.domSanitizer.bypassSecurityTrustUrl( urlBase64 );
    // this.currVerifiedLoanOfficerPhoto = 'data:image/jpg;base64,' + ( this.sanitizer.bypassSecurityTrustResourceUrl( item ) as any ).changingThisBreaksApplicationSecurity;

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

  private deleteIdea( itemInfo: ItemInfo ) {
    if ( itemInfo.itemType === 'idea' ) {
      this.deleteSubscription = this.ideaService.deletIdeaById( itemInfo.itemId )
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
        // this.ideas$ = this.ideaService.getUserIdeas();
        this.idea = data[ 'data' ];
        this.selectedIdeaId = this.idea.id;
        this.isIdeaSelected = true;
        this.ideasSub = this.ideaService.getUserIdeas()
          .subscribe( data => {
            this.ideas = data;
            this.idea = this.ideas[ this.ideas.length - 1 ]
          } );
      } )
  }

  deleteFile( fileName: string ) {

    // userId -> Id na potrebitel
    // operation -> delete | insert
    // filename: -> kogato imash delete , imeto na faila
    const fileInfo = {
      userId: this.userId,
      operation: 'delete',
      filename: fileName
    }
    this.fileFolderDelSubs = this.ideaService.postDeleteFileFromFolder( fileInfo )
      .subscribe( ( data ) => {
        this.deleteSubscription =
          this.ideaService.deleteFileFromIdea( this.selectedIdeaId, fileName )
            .subscribe( data => {
              console.log( data );
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
      this.deleteSubscription.unsubscribe();
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
    this.customModalService.open( name, itemType, actionType, item )

  }

  // Open default modal
  open( content, uploadedType: string ) {
    if ( uploadedType === 'files' ) {
      this.isImages = false;
    } else if ( uploadedType === 'images' ) {
      this.isImages = true;
    }
    this.modalRef = this.modalService.open( content, { size: 'lg', centered: true } );
    this.modalRef.result.then( ( result ) => {
      this.closeResult = `Closed with: ${result}`;
    }, ( reason ) => {
      this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
    } );
  }

  // This function is used in open
  private getDismissReason( reason: any ): string {
    if ( reason === ModalDismissReasons.ESC ) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  //function for upload files and pictures
  onUploadInit( args: any ): void {
    this.dropzone = args;
    console.log( 'onUploadInit:', args );
  }

  onUploadError( args: any ): void {
    alert( `File "${args[ 0 ].name}" - ${args[ 1 ]}` );
    console.log( 'onUploadError:', args );
  }

  onUploadSuccess( args: any, isImages: boolean ): void {
    console.log( "onUploadSuccess", args );
    console.log( args[ 1 ].split( ',' ) )
    let uploadImageInfo = args[ 1 ].split( ',' );
    const pathEnd = uploadImageInfo[ 0 ].slice( 2, -1 );
    const name = uploadImageInfo[ 1 ].slice( 1, -1 );
    const uploadInfo: IdeaFile = {
      name: name,
      path: `${pathEnd}`
    }
    // let idea = {
    //   info: {}
    // };
    // if ( isImages ) {
    //   idea.info = {
    //     images: []
    //   }
    //   idea.info[ 'images' ].push( uploadInfo );
    // } else {
    //   idea.info = {
    //     files: []
    //   }
    //   idea.info[ 'files' ].push( uploadInfo );
    // }
    if ( pathEnd !== '' ) {
      this.editIdeaSub = this.ideaService.putAddFileToIdea( this.selectedIdeaId, uploadInfo )
        .subscribe( data => {
          this.idea = data[ 'data' ];
          // if ( this.idea.info && this.idea.info[ 'images' ] ) {
          //   this.idea.info[ 'images' ].map( i => {
          //     // debugger;
          //     i.path = `${environment.fileUplodeUrl}files/${this.userId}/${i.path}`;
          //     i.path = this.sanitizer.bypassSecurityTrustUrl( i.path );
          //     return this.idea;
          //   } )
          // }
          // if ( this.idea.info && this.idea.info[ 'files' ] ) {
          //   this.idea.info[ 'files' ].map( f => {
          //     f.path = `${environment.fileUplodeUrl}files/${this.userId}/${f.path}`;
          //     f.path = this.sanitizer.bypassSecurityTrustUrl( f.path );
          //     return this.idea;
          //   } )
          // }
          console.log( this.idea );
          // this.selectedIdeaId = idea[ 'id' ];
          // this.isIdeaSelected = true;
          this.ideasSub = this.ideaService.getUserIdeas()
            .subscribe( data => {
              this.ideas = data;
            } );
        } );
    }
    // this.configFileDrop.addRemoveLinks = false;
    // this.configImageDrop.addRemoveLinks = false;
    //this.modalRef.close( 'Upload Finished' );
    console.log( 'onUploadSuccess:' );
  }

  onSending( data ): void {
    console.log( 'onSending', data );
    // data [ File , xhr, formData]
    //const file = data[ 0 ];
    const formData = data[ 2 ];
    formData.append( 'userId', this.userId );
    formData.append( 'operation', 'insert' );
  }

  upload() {
    this.dropzone.processQueue();
  }

}
