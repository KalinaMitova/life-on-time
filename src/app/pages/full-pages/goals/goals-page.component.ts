import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { GoalService } from 'app/shared/services/goal.service';
import { Goal } from 'app/shared/models/goal';
import { ModalService } from "../../../shared/services/modal.service";

@Component( {
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: [ './goals-page.component.scss' ]
} )
export class GoalsPageComponent implements OnInit {
  @ViewChild( 'type', { static: false } ) type: any;

  private title: string;
  private path: string;
  private goals$: Observable<Array<Goal>>;
  private today: string;

  constructor (
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private goalService: GoalService
  ) {
  }

  ngOnInit(): void {
    this.today = this.getCurrentDate( '/' );
    console.log( this.today );
    this.path = this.route.snapshot.routeConfig.path;
    this.setPage( this.path );
    this.goals$ = this.goalService.getGoalsByCategory( this.title );
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
          this.title = 'Health & Wellbeing';
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

  openModal( name: string, itemType: string, actionTypeOrTitle: string, item?: string ) {
    this.modalService.open( name, itemType, actionTypeOrTitle, item );
  }

  // onCancel() {
  //   this.confirmDeleteRef.dismiss( 'cancel click' );
  // }

  // onOK() {
  //   this.confirmDeleteRef.close( 'ok click' );
  // }
}
