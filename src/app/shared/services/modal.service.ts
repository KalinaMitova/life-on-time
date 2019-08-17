import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Modals } from "../models/modals";
import { SeparatedDate } from "../models/date";

@Injectable( {
  providedIn: 'root'
} )
export class ModalService {
  private closeResult: string;
  private item: any = {
    title: '',
    until_date: {
      day: null,
      month: null,
      year: null
    },
    description: ''
  }

  constructor ( private modalService: NgbModal ) { }

  open( name: string, itemType: string, actionTypeOrTitle: string, item: any = this.item ) {
    const modalRef = this.modalService.open( Modals[ name ] );
    console.log( modalRef );
    modalRef.componentInstance.itemType = itemType;
    if ( name === 'createEditModal' ) {
      modalRef.componentInstance.actionType = actionTypeOrTitle;
      modalRef.componentInstance.item = item;
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
