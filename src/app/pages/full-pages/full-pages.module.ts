import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { ProgressDashboardModule } from './progress-dashboard/progress-dashboard.module';
import { GoalsPageComponent } from './goals/goals-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule( {
  declarations: [ GoalsPageComponent ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ProgressDashboardModule,
    NgbModule
  ]
} )
export class FullPagesModule { }
