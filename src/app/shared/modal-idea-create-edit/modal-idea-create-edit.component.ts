import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../services/event.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActionInfo } from '../models/actionInfo';
// import { DropzoneConfigInterface, DropzoneRenameFileFunction } from 'ngx-dropzone-wrapper';

@Component( {
  selector: 'app-modal-idea-create-edit',
  templateUrl: './modal-idea-create-edit.component.html',
  styleUrls: [ './modal-idea-create-edit.component.scss' ]
} )
export class ModalIdeaCreateEditComponent implements OnInit {
  @Input() item: any;
  modalForm: FormGroup;
  itemType: string;
  actionType: string;
  isFromIdea: boolean = false;
  // isIdeaImagesCollapsed: boolean = true;
  // isIdeaFilesCollapsed: boolean = true;
  // disabled: false;

  // public configDrop: DropzoneConfigInterface = {
  //   clickable: true,
  //   maxFiles: 10,
  //   autoReset: null,
  //   errorReset: null,
  //   cancelReset: null,
  //   addRemoveLinks: true,
  //   autoQueue: true,
  //   autoProcessQueue: true
  // };


  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group( {
      name: [ this.item.name, [ Validators.required ] ],
      info: this.formBuilder.group( {
        content: [ this.item.info.content, ],
        // file: [ this.item.info.files, ],
        // image: [ this.item.info.images ]
      } )
    } );
  }

  get name() { return this.modalForm.get( 'name' ) };
  get content() { return this.modalForm.get( 'info.content' ) };
  //get info() { return this.modalForm.get( 'info' ) };
  // get file() { return this.modalForm.get( 'file' ) };
  // get image() { return this.modalForm.get( 'image' ) };

  close() {
    this.modalForm.reset();
    this.modal.close( 'Modal Form Closed' )
  }

  onAction( actionType: string, itemType: string, itemId?: string, ) {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      itemId,
      formValue: this.modalForm.value,
    }
    this.eventService.emit(
      {
        name: 'confirm create/edit',
        value: actionInfo
      }
    )
    this.modal.dismiss( 'Action Choosed, Modal Form Closed' );
  }

  //------------------for image upload
  // public onUploadInit( args: any ): void {
  //   console.log( args.files );
  //   console.log( 'onUploadInit:', args );
  // }

  // public onUploadError( args: any ): void {
  //   console.log( 'onUploadError:', args );
  // }

  // public onUploadSuccess( args: any ): void {
  //   console.log( 'onUploadSuccess:', args );
  // }
  // public addedFile( event ) {
  //   console.log( event );
  // }

  //------------------for image upload

}
