import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../shared/auth/auth-guard.service';

import { ChoosePlanPageComponent } from './choose-plan-page/choose-plan-page.component';
import { ErrorPageComponent } from './error/error-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'choose_plan',
        component: ChoosePlanPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'error',
        component: ErrorPageComponent,
      },
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ContentPagesRoutingModule { }
