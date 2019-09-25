import { Component, OnInit, OnDestroy } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Subscription } from 'rxjs';
import { UserService } from 'app/shared/services/user.service';

@Component( {
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: [ './calendar-page.component.scss' ]
} )
export class CalendarPageComponent implements OnInit, OnDestroy {

  calendarPlugins = [ dayGridPlugin ];
  events: any;

  private dueDatesSubs: Subscription;
  constructor (
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dueDatesSubs =
      this.userService.getIdeasAndGoalsDueDate()
        .subscribe( data => {
          this.events = data;
        } )
  }

  ngOnDestroy(): void {
    if ( this.dueDatesSubs ) {
      this.dueDatesSubs.unsubscribe();
    }
  }
}
