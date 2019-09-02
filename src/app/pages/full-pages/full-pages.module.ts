import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ProgressDashboardModule } from './progress-dashboard/progress-dashboard.module';
import { GoalsPagesModule } from './goals/goals-pages.module';
import { IdeasPageModule } from './ideas/ideas-page.module';

@NgModule( {
  declarations: [],
  imports: [
    CommonModule,
    ProgressDashboardModule,
    // NgbModule,
    FullPagesRoutingModule,
    GoalsPagesModule,
    IdeasPageModule
  ]
} )
export class FullPagesModule { }
