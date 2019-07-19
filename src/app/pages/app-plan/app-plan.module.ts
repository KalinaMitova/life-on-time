import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPlanRoutingModule } from './app-plan-routing.module';
import { ChoosePlanPageComponent } from './choose-plan-page/choose-plan-page.component';

@NgModule( {
  declarations: [ ChoosePlanPageComponent ],
  imports: [
    CommonModule,
    AppPlanRoutingModule
  ]
} )
export class AppPlanModule { }
