import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { GoalsPageComponent } from './goals/goals-page.component';

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
        component: GoalsPageComponent,
      },
      {
        path: 'personal-development',
        component: GoalsPageComponent,
      }, {
        path: 'relationships',
        component: GoalsPageComponent,
      }, {
        path: 'physical-activity',
        component: GoalsPageComponent,
      }, {
        path: 'financial',
        component: GoalsPageComponent,
      },
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class FullPagesRoutingModule { }
