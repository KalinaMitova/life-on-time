import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../services/event.service';

@Component( {
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: [ './modal-confirm.component.scss' ]
} )
export class ModalConfirmComponent {

  constructor (
    private modal: NgbActiveModal,
    private eventService: EventService
  ) { }

  onCancel() {
    this.modal.dismiss( 'cancel click' );
  }

  onOK( itemType: string, itemId: string ) {
    let itemInfo = {
      itemId,
      itemType
    }
    this.eventService.emit( {
      name: 'confirm delete',
      value: itemInfo
    } )
    this.modal.close( 'Ok click' );
  }

}
