import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { GoalsPageComponent } from './goals/goals-page.component';
import { IdeasPageComponent } from './ideas/ideas-page.component';
import { WellbeingPagesComponent } from './wellbeing/wellbeing-pages/wellbeing-pages.component';
import { HelpPageComponent } from './help-page/help-page/help-page.component';
import { CalendarPageComponent } from './calendar/calendar-page/calendar-page.component';

const submenuGoal = [];
// const goalCategories = window.categories;
// console.log( goalCategories );
// for ( const category of goalCategories ) {
//   submenuGoal.push( {
//     path: category.pathEnd,
//     component: GoalsPageComponent,
//   } )
// }

// [
//   {
//     path: 'health-&-wellbeing',
//     component: GoalsPageComponent,
//   },
//   {
//     path: 'personal-development',
//     component: GoalsPageComponent,
//   }, {
//     path: 'relationships',
//     component: GoalsPageComponent,
//   }, {
//     path: 'physical-activity',
//     component: GoalsPageComponent,
//   }, {
//     path: 'financial',
//     component: GoalsPageComponent,
//   },
// ]

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
        path: '**',
        component: GoalsPageComponent,
      },
      // {
      //   path: 'personal-development',
      //   component: GoalsPageComponent,
      // }, {
      //   path: 'relationships',
      //   component: GoalsPageComponent,
      // }, {
      //   path: 'physical-activity',
      //   component: GoalsPageComponent,
      // }, {
      //   path: 'financial',
      //   component: GoalsPageComponent,
      // },
    ]
  },
  {
    path: 'ideas',
    component: IdeasPageComponent
  },
  {
    path: 'wellbeing',
    children: [
      {
        path: 'relax-me',
        component: WellbeingPagesComponent
      },
      {
        path: 'inspire-me',
        component: WellbeingPagesComponent
      },
      {
        path: 'teach-me',
        component: WellbeingPagesComponent
      }
    ]
  },
  {
    path: 'help',
    component: HelpPageComponent
  },
  {
    path: 'calendar',
    component: CalendarPageComponent
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class FullPagesRoutingModule { }
