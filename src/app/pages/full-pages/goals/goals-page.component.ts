import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { GoalService } from 'app/shared/services/goal.service';
import { Goal } from 'app/shared/models/goal';
import { ModalConfirmComponent } from 'app/shared/modal-confirm/modal-confirm.component';
import { ModalCreateEditComponent } from 'app/shared/modal-create-edit/modal-create-edit.component';
import { map } from 'rxjs/operators';
const MODALS = {
  createEditModal: ModalCreateEditComponent,
  confirmModal: ModalConfirmComponent
}

@Component( {
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: [ './goals-page.component.scss' ]
} )
export class GoalsPageComponent implements OnInit {

  @ViewChild( 'type', { static: false } ) type: any;

  // private confirmDelete: ModalConfirmComponent;
  private title: string;
  private path: string;
  private goals: Observable<Array<Goal>>;
  private closeResult: string;
  private today: string;
  private item = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor (
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private goalService: GoalService
  ) { }

  ngOnInit(): void {
    this.today = this.getCurrentDate( '-' );
    console.log( this.today );
    this.path = this.route.snapshot.routeConfig.path;
    this.setPage( this.path );
    this.goalService.getAllHealthGoals()
      .pipe(
        map( data => data[ 'dataValue' ] ),

      ).subscribe( d => console.log( d ) );
  }

  submit( form ) {
    console.log( form );
  }

  deleteGoal( id: string ) {

  }

  private setPage( path: string ) {
    switch ( path ) {
      case 'health-wellbeing':
        {
          this.title = 'Health and Wellbeing';
        } break;
      case 'personal-development':
        {
          this.title = 'Personal Development';
        } break;
      case 'physical-activity':
        {
          this.title = 'Physical Activity';
        } break;
      case 'relationships':
        {
          this.title = 'Relationships';
        } break;
      case 'financial':
        {
          this.title = 'Financial';
        } break;
      default: {
        this.title = "";
      } break;
    }
  }

  private getCurrentDate( separator: string ) {
    let today = new Date();
    let dd = today.getDate();
    let mm = ( today.getMonth() + 1 ); //As January is 0.
    let yyyy = today.getFullYear();

    // if ( dd < 10 ) dd = '0' + dd;
    // if ( mm < 10 ) mm = '0' + mm;
    return ( yyyy + separator + mm + separator + dd );
  };

  openModal( name: string, itemType: string, actionTypeOrTitle: string ) {
    const modalRef = this.modalService.open( MODALS[ name ] );
    modalRef.componentInstance.itemType = itemType;
    if ( name = 'createEditModal' ) {
      modalRef.componentInstance.actionType = actionTypeOrTitle;
      modalRef.componentInstance.item = this.item;
    } else {
      modalRef.componentInstance.title = actionTypeOrTitle;
    }
    modalRef.result.then( ( result ) => {

      this.closeResult = `Closed with: ${result}`;
      console.log( this.closeResult );
    }, ( reason ) => {
      this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
    } );
  }

  private getDismissReason( reason: any ): string {
    if ( reason === ModalDismissReasons.ESC ) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // open( content ) {
  //   // const modalRef = this.modalService.open( NgbdModalContent );
  //   const modalRef = this.modalService.open( content, { size: 'lg' } );
  //   modalRef.componentInstance.type = 'Edit';

  //   modalRef.result.then( ( result ) => {

  //     this.closeResult = `Closed with: ${result}`;
  //     console.log( this.closeResult );
  //   }, ( reason ) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
  //   } );
  // }

  // private getDismissReason( reason: any ): string {
  //   if ( reason === ModalDismissReasons.ESC ) {
  //     return 'by pressing ESC';
  //   } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  // onCancel() {
  //   this.confirmDeleteRef.dismiss( 'cancel click' );
  // }

  // onOK() {
  //   this.confirmDeleteRef.close( 'ok click' );
  // }
}
