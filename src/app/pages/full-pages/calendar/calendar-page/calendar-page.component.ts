import { Component, OnInit, OnDestroy } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';

import { GoalCreate } from 'app/shared/models/goalCreate';
import { UserService } from 'app/shared/services/user.service';
import { ModalService } from 'app/shared/services/modal.service';
import { EventService } from 'app/shared/services/event.service';
import { GoalService } from 'app/shared/services/goal.service';
import { Router } from '@angular/router';
import { convertDateToString } from 'app/shared/utilities';
import { ItemInfo } from 'app/shared/models/itemInfo';

@Component( {
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: [ './calendar-page.component.scss' ]
} )
export class CalendarPageComponent implements OnInit, OnDestroy {

  calendarPlugins = [ dayGridPlugin, interactionPlugin ];
  events: any;

  private dueDatesSubs: Subscription;
  private eventSubs: Subscription;
  private createGoalSubs: Subscription;

  constructor (
    private userService: UserService,
    private modalService: ModalService,
    private eventService: EventService,
    private goalService: GoalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dueDatesSubs =
      this.userService.getIdeasAndGoalsDueDate()
        .subscribe( data => {
          this.events = data;
        } );

    this.eventSubs =
      this.eventService.on( 'confirm create/edit', ( actionInfo => this.createGoal( actionInfo.formValue ) ) )
  }

  private createGoal( formValue ) {
    let goal: GoalCreate = formValue;
    const date = formValue.until_date;
    goal.until_date = convertDateToString( date.day, date.month, date.year, '-' );
    goal.category_id = goal[ 'goalCategoryId' ];
    this.createGoalSubs =
      this.goalService.postCreateGoal( goal )
        .subscribe( data => {
          const navigatePath = window.categories.find( c => c.id === goal.category_id ).pathEnd;
          this.router.navigate( [ '/goals', navigatePath ] )
        } )
  }

  onDateClick( arg ) {
    const dateAsArray = arg.dateStr.split( '-' );
    const goal = {
      'until_date': {
        day: Number( dateAsArray[ 2 ] ),
        month: Number( dateAsArray[ 1 ] ),
        year: Number( dateAsArray[ 0 ] )
      }
    }
    this.modalService.open( 'createEditModal', 'goal', 'create', goal );
  }

  ngOnDestroy(): void {
    if ( this.dueDatesSubs ) {
      this.dueDatesSubs.unsubscribe();
    }

    if ( this.eventSubs ) {
      this.eventSubs.unsubscribe();
    }

    if ( this.createGoalSubs ) {
      this.createGoalSubs.unsubscribe();
    }
  }
}
