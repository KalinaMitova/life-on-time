import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ProgressDashboardModule } from './progress-dashboard/progress-dashboard.module';
import { GoalsPagesModule } from './goals/goals-pages.module';
import { IdeasPageModule } from './ideas/ideas-page.module';
import { WellbeingPagesModule } from './wellbeing/wellbeing-pages.module';
import { HelpPageModule } from './help-page/help-page.module';
import { CalendarPageModule } from './calendar/calendar-page.module';

@NgModule( {
  declarations: [],
  imports: [
    CommonModule,
    ProgressDashboardModule,
    FullPagesRoutingModule,
    GoalsPagesModule,
    IdeasPageModule,
    WellbeingPagesModule,
    HelpPageModule,
    CalendarPageModule,
  ]
} )
export class FullPagesModule { }
