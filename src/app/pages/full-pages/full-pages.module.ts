import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { ProgressDashboardModule } from './progress-dashboard/progress-dashboard.module';

@NgModule( {
  declarations: [],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ProgressDashboardModule,
  ]
} )
export class FullPagesModule { }
