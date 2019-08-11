import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GoalsPageComponent } from './goals-page.component';
import { SingleGoalCardComponent } from './single-goal-card/single-goal-card.component';



@NgModule( {
  exports: [
    GoalsPageComponent
  ],
  declarations: [
    GoalsPageComponent,
    SingleGoalCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
} )
export class GoalsPagesModule {

}
