import { Component, Input } from '@angular/core';
import { ModalService } from 'app/shared/services/modal.service';

@Component( {
  selector: 'app-single-action',
  templateUrl: './single-action.component.html',
  styleUrls: [ './single-action.component.scss' ]
} )
export class SingleActionComponent {
  @Input() task: any;

  constructor ( private modalService: ModalService ) { }

  openModal( name: string, itemType: string, actionTypeOrTitle: string, item?: any ) {
    this.modalService.open( name, itemType, actionTypeOrTitle, item );
  }
}
