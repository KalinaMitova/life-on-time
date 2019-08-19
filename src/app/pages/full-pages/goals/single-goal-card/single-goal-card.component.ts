import { Component, Input } from '@angular/core';
import { Goal } from 'app/shared/models/goal';
import { ModalService } from '../../../../shared/services/modal.service'

@Component( {
  selector: 'app-single-goal-card',
  templateUrl: './single-goal-card.component.html',
  styleUrls: [ './single-goal-card.component.scss' ]
} )
export class SingleGoalCardComponent {
  @Input() goal: Goal;

  constructor ( private modalService: ModalService ) { }

  openModal( name: string, itemType: string, actionTypeOrTitle: string, item?: any ) {
    this.modalService.open( name, itemType, actionTypeOrTitle, item );
  }
}
