import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component( {
  selector: 'app-modal-create-edit',
  templateUrl: './modal-create-edit.component.html',
  styleUrls: [ './modal-create-edit.component.scss' ]
} )
export class ModalCreateEditComponent implements OnInit {

  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService
  ) { }

  ngOnInit() {
  }
  close() {
    this.modal.close( 'Modal Form Closed' )
  }

  onAction( actionType: string, itemType: string, form: NgForm, itemId: string ) {
    const actionInfo = {
      actionType,
      itemType,
      itemId,
      form
    }
    this.eventService.emit(
      {
        name: 'confirm create/edit',
        value: actionInfo
      }
    )
    this.modal.dismiss( 'Action Choosed, Modal Form Closed' );
  }
}
