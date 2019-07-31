import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from "ng-chartist"

import { ProgressDashboardComponent } from './progress-dashboard-page/progress-dashboard.component';
import { ChartComponent } from './donut-chart/chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';



@NgModule( {
  exports: [ ProgressDashboardComponent ],
  declarations: [
    ProgressDashboardComponent,
    ChartComponent,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    ChartistModule
  ]
} )
export class ProgressDashboardModule {

}
