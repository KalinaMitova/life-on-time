import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';

@NgModule( {
  declarations: [ ProgressDashboardComponent ],
  imports: [
    CommonModule,
    FullPagesRoutingModule
  ]
} )
export class FullPagesModule { }
