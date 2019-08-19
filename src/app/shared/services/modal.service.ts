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
    id: '',
    goal_id: '',
    title: '',
    until_date: {
      day: null,
      month: null,
      year: null
    },
    description: ''
  }

  constructor ( private modalService: NgbModal ) { }

  open( name: string, itemType: string, actionType: string, item: any = this.item ) {
    const modalRef = this.modalService.open( Modals[ name ] );
    modalRef.componentInstance.itemType = itemType;
    if ( name === 'createEditModal' ) {
      modalRef.componentInstance.actionType = actionType;
      modalRef.componentInstance.item = item;
    } else if ( name === 'confirmModal' ) {
      modalRef.componentInstance.title = item.title;
      modalRef.componentInstance.itemId = item.id;
    }
    modalRef.result.then( ( result ) => {

      this.closeResult = `Closed with: ${result}`;
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
