import { Component, Input } from '@angular/core';
import { ModalService } from 'app/shared/services/modal.service';
import { EventService } from 'app/shared/services/event.service';
import { ItemInfo } from 'app/shared/models/itemInfo';

@Component( {
  selector: 'app-single-action',
  templateUrl: './single-action.component.html',
  styleUrls: [ './single-action.component.scss' ]
} )
export class SingleActionComponent {
  @Input() task: any;

  constructor (
    private modalService: ModalService,
    private eventService: EventService
  ) { }

  openModal( name: string, itemType: string, actionTypeOrTitle: string, item?: any ) {
    this.modalService.open( name, itemType, actionTypeOrTitle, item );
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
      }
      )
  }
}
