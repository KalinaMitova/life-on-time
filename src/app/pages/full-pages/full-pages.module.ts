import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { ProgressDashboardModule } from './progress-dashboard/progress-dashboard.module';
import { HealthWellbeingComponent } from './goals/health-wellbeing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule( {
  declarations: [ HealthWellbeingComponent ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ProgressDashboardModule,
    NgbModule
  ]
} )
export class FullPagesModule { }
