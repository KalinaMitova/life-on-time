import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateEditComponent } from '../../../../shared/modal-create-edit/modal-create-edit.component'
import { ModalConfirmComponent } from '../../../../shared/modal-confirm/modal-confirm.component'

const MODALS = {
  createEditModal: ModalCreateEditComponent,
  confirmModal: ModalConfirmComponent
}
@Component( {
  selector: 'app-single-action',
  templateUrl: './single-action.component.html',
  styleUrls: [ './single-action.component.scss' ]
} )
export class SingleActionComponent {
  @Input() item: any;

  private closeResult: string;

  constructor ( private modalService: NgbModal ) { }

  openModal( name: string, itemType: string, actionTypeOrTitle: string ) {
    const modalRef = this.modalService.open( MODALS[ name ] );
    modalRef.componentInstance.itemType = itemType;
    if ( name = 'createEditModal' ) {
      modalRef.componentInstance.actionType = actionTypeOrTitle;
      modalRef.componentInstance.item = this.item;
    } else {
      modalRef.componentInstance.title = actionTypeOrTitle;
    }
    modalRef.result.then( ( result ) => {

      this.closeResult = `Closed with: ${result}`;
      console.log( this.closeResult );
    }, ( reason ) => {
      this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
    } );
  }

  private getDismissReason( reason: any ): string {
    if ( reason === ModalDismissReasons.ESC ) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
