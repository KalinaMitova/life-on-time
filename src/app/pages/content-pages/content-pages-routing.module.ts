import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../shared/auth/auth-guard.service';

import { ChoosePlanPageComponent } from './choose-plan-page/choose-plan-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chooseplan',
        component: ChoosePlanPageComponent,
        canActivate: [ AuthGuard ]
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ContentPagesRoutingModule { }
