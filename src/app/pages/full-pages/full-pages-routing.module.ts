import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { HealthWellbeingComponent } from './health-wellbeing/health-wellbeing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'progress-dashboard',
        component: ProgressDashboardComponent,
      },
    ]
  },
  {
    path: 'goals',
    children: [
      {
        path: 'health-wellbeing',
        component: HealthWellbeingComponent,
      },
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class FullPagesRoutingModule { }
