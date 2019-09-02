import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ActionInfo } from '../models/actionInfo';

@Component( {
  selector: 'app-modal-create-edit',
  templateUrl: './modal-create-edit.component.html',
  styleUrls: [ './modal-create-edit.component.scss' ]
} )
export class ModalCreateEditComponent implements OnInit {
  @Input() item: any;
  modalForm: FormGroup;
  itemType: string;
  actionType: string;
  isFromIdea: boolean = false;

  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.modalForm = this.formBuilder.group( {
      title: [ this.item.title, [ Validators.required ] ],
      description: [ this.item.description, ],
      until_date: [ this.item.until_date, [ Validators.required ] ],
      goalCategoryId: [ '' ]
    } );
  }

  get title() { return this.modalForm.get( 'title' ) };
  get description() { return this.modalForm.get( 'description' ) };
  get until_date() { return this.modalForm.get( 'until_date' ) };
  get goalCategoryId() { return this.modalForm.get( 'goalCategoryId' ) };

  close() {
    this.modalForm.reset();
    this.modal.close( 'Modal Form Closed' )
  }

  onAction( actionType: string, itemType: string, itemId: string, goalId?: string ) {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      itemId,
      formValue: this.modalForm.value,
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
