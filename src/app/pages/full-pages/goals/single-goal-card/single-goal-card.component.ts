import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'app/shared/models/goal';
import { ModalService } from 'app/shared/services/modal.service'
import { ItemInfo } from 'app/shared/models/itemInfo';
import { EventService } from 'app/shared/services/event.service';
import { SeparatedDate } from 'app/shared/models/date';

@Component( {
  selector: 'app-single-goal-card',
  templateUrl: './single-goal-card.component.html',
  styleUrls: [ './single-goal-card.component.scss' ]
} )
export class SingleGoalCardComponent implements OnInit {
  @Input() goal: Goal;
  isGoalExpired;

  constructor (
    private modalService: ModalService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    if ( this.goal.until_date ) {
      this.isGoalExpired = Math.round( ( Date.now() -
        +( new Date( `${this.goal.until_date.year}-${this.goal.until_date.month}- ${this.goal.until_date.day}` ) ) ) / ( 60 * 60 * 24 * 1000 ) ) > 1;
    }
  }

  openModal( name: string, itemType: string, actionType: string, itemId?: any, date?: SeparatedDate ) {
    this.modalService.open( name, itemType, actionType, itemId, date );
  }

  changeStatus( itemType: string, itemId: string, status: number ) {
    const itemInfo: ItemInfo = {
      itemType,
      itemId,
      status
    }
    this.eventService
      .emit( {
        name: 'change status',
        value: itemInfo
      } )
  }

  // public ngOnDestroy(): void {
  //   this.modalService.unsubscribe(); // or something similar
  // }
}
