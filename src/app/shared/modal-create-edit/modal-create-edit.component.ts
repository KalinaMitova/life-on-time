import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ActionInfo } from '../models/actionInfo';

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

  onAction( actionType: string, itemType: string, form: NgForm, itemId: string, goalId?: string ) {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      itemId,
      form,
      goalId
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
