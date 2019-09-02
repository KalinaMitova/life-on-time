import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Modals } from "../models/modals";
import { SeparatedDate } from "../models/date";
import { stringify } from '@angular/compiler/src/util';

@Injectable( {
  providedIn: 'root'
} )
export class ModalService {
  private closeResult: string;

  constructor ( private modalService: NgbModal ) { }

  open( name: string, itemType: string, actionType: string, itemInfo?: any ) {
    const modalRef = this.modalService.open( Modals[ name ] );
    modalRef.componentInstance.itemType = itemType;
    if ( name === 'createEditModal' ) {
      this.setEditCreateModalProp( modalRef, itemType, actionType, itemInfo )
    } else if ( name === 'confirmModal' ) {
      modalRef.componentInstance.title = itemInfo.title ? itemInfo.title : itemInfo.name;
      modalRef.componentInstance.itemId = itemInfo.id;
    } else if ( name === 'createEditIdeaModal' ) {
      if ( actionType === 'create' ) {
        let item = {
          name: '',
          info: {
            content: "",
            files: [],
            images: [],
          }
        }
        modalRef.componentInstance.item = item;
      } else if ( actionType === 'edit' ) {
        modalRef.componentInstance.item = itemInfo;
      }
      modalRef.componentInstance.actionType = actionType;
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
  private setEditCreateModalProp( modalRef: NgbModalRef, itemType: string, actionType: string, itemInfo?: any ) {
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
      } else if ( itemType === 'goal' && itemInfo ) {
        item.title = itemInfo.name;
        item.description = itemInfo.content ? itemInfo.content : '';
        modalRef.componentInstance.isFromIdea = true;
        modalRef.componentInstance.categories = window.categories;
      }

      modalRef.componentInstance.item = item;
    } else if ( actionType === 'edit' ) {
      modalRef.componentInstance.item = itemInfo;
    }
    modalRef.componentInstance.actionType = actionType;
  }
}
