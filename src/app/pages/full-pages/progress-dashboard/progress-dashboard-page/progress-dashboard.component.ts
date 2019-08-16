import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
  private minStatSubscription: Subscription;
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
    //this.minStatSubscription =
    forkJoin(
      //first row
      this.goalService.getUserGoals(),
      this.taskService.getUserAllTasks(),
      this.ideasService.getUserIdeas(),
      this.taskService.getDaysToCompleteTasks(),
      //second row
      this.goalService.getUserCompletedGoals(),
      this.taskService.getUserCompletedTasks(),
      this.goalService.getUserGoalsFromIdeas(),
      this.goalService.getUserRate(),
    )
      .pipe(
        map( (
          [ goals, tasks, ideas, daysTocompleteTasks,
            completedGoals, completedTasks, ideasToGoals, rate
          ] ) => {
          // forkJoin returns an array of values, here we map those values to an object
          return {
            goals: goals.dataValue.goalsNumber,
            tasks: tasks.data.taskNumber,
            ideas: ideas.dataValue.ideasNumber,
            daysTocompleteTasks: daysTocompleteTasks.dataValue.days,
            completedGoals: completedGoals.dataValue.number,
            completedTasks: completedTasks.dataValue.number,
            ideasToGoals: ideasToGoals.dataValue.number,
            rate: rate.dataValue.percent
          };
        } )
      )
      .subscribe( ( data ) => {
        console.log( data );
        this.minStaticsDataFirstRow[ 0 ].value = data.goals;
        this.minStaticsDataFirstRow[ 1 ].value = data.tasks;
        this.minStaticsDataFirstRow[ 2 ].value = data.ideas;
        this.minStaticsDataFirstRow[ 3 ].value = data.daysTocompleteTasks;
        this.minStaticsDataSecondRow[ 0 ].value = data.completedGoals;
        this.minStaticsDataSecondRow[ 1 ].value = data.completedTasks;
        this.minStaticsDataSecondRow[ 2 ].value = data.ideasToGoals;
        this.minStaticsDataSecondRow[ 3 ].value = + Math.round( data.rate ).toFixed( 2 );
      } );

    const values = Object.keys( ChartData ).map( key => ChartData[ key ] );
    for ( let chart of values ) {
      this.dataChart.push( chart );
    }
    this.barChart = this.dataChart.pop();
  }

  ngOnDestroy() {
    if ( this.minStatSubscription ) {
      this.minStatSubscription.unsubscribe();

    }
  }
}
