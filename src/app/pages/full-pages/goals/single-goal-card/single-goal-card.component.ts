import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component( {
  selector: 'app-single-goal-card',
  templateUrl: './single-goal-card.component.html',
  styleUrls: [ './single-goal-card.component.scss' ]
} )
export class SingleGoalCardComponent {
  @Input() item: any;
  @Input() goal: any;

  @Output() deleteConfirm: EventEmitter<any> = new EventEmitter();

  deleteSelected() {
    this.deleteConfirm.emit( null );
  }
}
