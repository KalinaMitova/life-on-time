import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoosePlanPageComponent } from './choose-plan-page/choose-plan-page.component';


const routes: Routes = [
  {
    path: 'chooseplan',
    component: ChoosePlanPageComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AppPlanRoutingModule { }
