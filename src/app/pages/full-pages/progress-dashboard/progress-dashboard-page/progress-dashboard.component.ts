import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { minStatisticData } from '../../../../shared/data/minStatisticFirstRowData';
import { GoalService } from "../../../../shared/services/goal.service";
import { TaskService } from "../../../../shared/services/task.service";
import { IdeaService } from 'app/shared/services/idea.service';

//Declarations
declare var require: any;
const ChartData: any = require( 'app/shared/data/chartsData.json' );

@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  private dataChart = [];
  private barChart;
  private minStaticsDataFirstRow = minStatisticData.firstRow;
  private minStaticsDataSecondRow = minStatisticData.secondRow;
  // private userRegistrationDate: string;
  // private userGoals: number = 0;
  // private userTasks: number = 0;
  // private userIdeas: number = 0;
  // private daysToCompleteAction: number = 0;
  // private userCompletedGoals: number = 0;
  // private userCompletedTasks: number = 0;
  // private userCompletedIdeas: number = 0;
  // private achievmentRate: number = 0;

  constructor (
    private taskService: TaskService,
    private goalService: GoalService,
    private ideasService: IdeaService
  ) {

  }


  ngOnInit() {
    //min statistics
    forkJoin(
      //first row
      this.goalService.getUserGoals(),
      this.taskService.getUserTasks(),
      this.ideasService.getUserIdeas(),
      this.taskService.getDaysToCompleteTasks(),
      //second row
      this.goalService.getUserCompletedGoals(),
      this.taskService.getUserCompletedTasks(),
      this.goalService.getUserGoalsFromIdeas(),
      // this.goalService.getUserRate(),
    )
      // .pipe(
      //   map( (
      //     [ goals, tasks, ideas, daysTocompleteTasks,
      //       completedGoals, completedTasks, ideasToGoals, rate
      //     ] ) => {
      //     // forkJoin returns an array of values, here we map those values to an object
      //     return {
      //       goals, tasks, ideas, daysTocompleteTasks,
      //       completedGoals, completedTasks, ideasToGoals, rate
      //     };
      //   } )
      // )
      .subscribe( ( [ goals, tasks, ideas, daysTocompleteTasks,
        completedGoals, completedTasks, ideasToGoals,
        // rate
      ] ) => {
        this.minStaticsDataFirstRow[ 0 ].value = goals.data.length;
        this.minStaticsDataFirstRow[ 1 ].value = tasks.data.length;
        this.minStaticsDataFirstRow[ 2 ].value = ideas.data.length;
        this.minStaticsDataFirstRow[ 3 ].value = daysTocompleteTasks.data.length;
        this.minStaticsDataSecondRow[ 0 ].value = completedGoals.data.length;
        this.minStaticsDataSecondRow[ 1 ].value = completedTasks.data.length;
        this.minStaticsDataSecondRow[ 2 ].value = ideasToGoals.data.length;
        // this.minStaticsDataSecondRow[ 3 ].value = + Math.round( rate.data[ 'percent' ] ).toFixed( 2 );
      } );

    const values = Object.keys( ChartData ).map( key => ChartData[ key ] );
    for ( let chart of values ) {
      this.dataChart.push( chart );
    }
    this.barChart = this.dataChart.pop();
  }

}
