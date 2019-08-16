import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component( {
  selector: 'app-modal-create-edit',
  templateUrl: './modal-create-edit.component.html',
  styleUrls: [ './modal-create-edit.component.scss' ]
} )
export class ModalCreateEditComponent implements OnInit {
  @Output() actionSelected: EventEmitter<any> = new EventEmitter();
  constructor ( public modal: NgbActiveModal ) { }

  ngOnInit() {
  }
  close() {
    this.modal.close( 'Modal Form Closed' )
  }

  onAction( actionType: string, itemType: string ) {
    const actionInfo = {
      actionType: actionType,
      itemType: itemType,
    }
    this.actionSelected.emit( actionInfo );
    this.modal.dismiss( 'Action Choosed, Modal Form Closed' );
  }
}