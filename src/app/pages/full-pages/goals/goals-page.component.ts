import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Task } from 'app/shared/models/task';

@Component( {
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: [ './goals-page.component.scss' ]
} )
export class GoalsPageComponent implements OnInit {

  @ViewChild( 'actionModalForm', { static: true } ) actionModalForm: NgForm;
  @ViewChild( 'createActionModal', { static: true } ) createActionModal; private title: string;
  private path: string
  private closeResult: string;
  private today: string;
  private action: Task = {
    title: '',
    dueDate: ''
  };


  constructor (
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    // public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.today = this.getCurrentDate( '-' );
    console.log( this.today );
    this.path = this.route.snapshot.routeConfig.path;
    switch ( this.path ) {
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

  private submit( form ) {
    console.log( form );
    // this.activeModal.close( "Submit" );
    // this.activeModal.close( this.modalForm.value );
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

  open( content ) {
    this.modalService.open( content, { size: 'lg' } ).result.then( ( result ) => {
      this.closeResult = `Closed with: ${result}`;
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
}
