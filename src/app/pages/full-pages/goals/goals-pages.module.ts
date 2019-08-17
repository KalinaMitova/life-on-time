import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GoalsPageComponent } from './goals-page.component';
import { SingleGoalCardComponent } from './single-goal-card/single-goal-card.component';
import { SingleActionComponent } from './single-action/single-action.component';
// import { ModalConfirmComponent } from 'app/shared/modal-confirm/modal-confirm.component';
// import { ModalCreateEditComponent } from 'app/shared/modal-create-edit/modal-create-edit.component';



@NgModule( {
  exports: [
    GoalsPageComponent,
  ],
  declarations: [
    GoalsPageComponent,
    SingleGoalCardComponent,
    SingleActionComponent,
    // ModalConfirmComponent,
    // ModalCreateEditComponent,
  ],
  imports: [
    CommonModule,
    // FormsModule,
    NgbModule
  ],
  // entryComponents: [
  //   ModalConfirmComponent,
  //   ModalCreateEditComponent,
  // ]
} )
export class GoalsPagesModule {

}
