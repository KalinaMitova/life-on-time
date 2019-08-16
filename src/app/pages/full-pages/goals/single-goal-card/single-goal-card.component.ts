import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Goal } from 'app/shared/models/goal';
import { ModalCreateEditComponent } from 'app/shared/modal-create-edit/modal-create-edit.component';
import { ModalConfirmComponent } from 'app/shared/modal-confirm/modal-confirm.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

const MODALS = {
  createEditModal: ModalCreateEditComponent,
  confirmModal: ModalConfirmComponent
}

@Component( {
  selector: 'app-single-goal-card',
  templateUrl: './single-goal-card.component.html',
  styleUrls: [ './single-goal-card.component.scss' ]
} )
export class SingleGoalCardComponent {
  @Input() goal: Goal;
  @Output() deleteConfirm: EventEmitter<any> = new EventEmitter();
  private closeResult: string;

  constructor ( private modalService: NgbModal ) { }

  deleteSelected() {
    this.deleteConfirm.emit( null );
  }
  openModal( name: string, itemType: string, actionTypeOrTitle: string, item?: any ) {
    const modalRef = this.modalService.open( MODALS[ name ] );
    console.log( modalRef );
    modalRef.componentInstance.itemType = itemType;
    if ( name = 'createEditModal' ) {
      modalRef.componentInstance.actionType = actionTypeOrTitle;
      if ( actionTypeOrTitle === 'edit' ) {
        modalRef.componentInstance.item = item;
      }
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
