import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component( {
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: [ './modal-confirm.component.scss' ]
} )
export class ModalConfirmComponent {
  @Output() deleteSelected: EventEmitter<any> = new EventEmitter();

  constructor ( public modal: NgbActiveModal ) { }

  onCancel() {
    this.modal.dismiss( 'cancel click' );
  }

  onOK() {
    this.deleteSelected.emit( null );
    this.modal.close( 'Ok click' );
  }

}
