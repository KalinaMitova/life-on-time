import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Modals } from "../models/modals";
import { SeparatedDate } from "../models/date";

@Injectable( {
  providedIn: 'root'
} )
export class ModalService {
  private closeResult: string;

  constructor ( private modalService: NgbModal ) { }

  open( name: string, itemType: string, actionType: string, itemInfo: any ) {
    const modalRef = this.modalService.open( Modals[ name ] );
    modalRef.componentInstance.itemType = itemType;
    debugger;
    if ( name === 'createEditModal' ) {
      if ( actionType === 'create' ) {
        let item = {
          title: '',
          until_date: {
            day: null,
            month: null,
            year: null
          },
          description: ''
        }
        if ( itemType === 'action' ) {
          item[ 'goal_id' ] = itemInfo;
        }
        modalRef.componentInstance.item = item;
      } else if ( actionType === 'edit' ) {
        modalRef.componentInstance.item = itemInfo;
      }
      modalRef.componentInstance.actionType = actionType;
    } else if ( name === 'confirmModal' ) {
      modalRef.componentInstance.title = itemInfo.title;
      modalRef.componentInstance.itemId = itemInfo.id;
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
