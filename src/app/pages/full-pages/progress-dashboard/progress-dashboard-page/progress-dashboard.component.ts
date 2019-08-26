import { Component, OnInit, OnDestroy, ViewChild, SimpleChange } from '@angular/core';
import { forkJoin, Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SimpleChanges } from '@angular/core';

import { minStatisticData } from '../../../../shared/data/minStatisticFirstRowData';
import { GoalService } from "../../../../shared/services/goal.service";
import { TaskService } from "../../../../shared/services/task.service";
import { IdeaService } from 'app/shared/services/idea.service';

//import { BarChart } from "../../../../shared/models/barChart";
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from 'app/shared/services/user.service';

//Declarations
declare var require: any;
const ChartData: any = require( 'app/shared/data/chartsData.json' );

@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  private registrationDate: string;
  private donutChart;
  private barChart = {
    "labels": [
      "Health & Wellbeing",
      "Personal Development",
      "Relationships",
      "Physical Activity",
      "Financial"
    ],
    "series": [ {
      "name": "Goals",
      "value": []
    }, {
      "name": "Actions",
      "value": []
    } ]
  };
  private minStaticsDataFirstRow = minStatisticData.firstRow;
  private minStaticsDataSecondRow = minStatisticData.secondRow;
  private minStatSubscription: Subscription;
  private donutChartSubscription: Subscription;
  private barChartSubscription: Subscription;
  private regDateSubscription: Subscription;

  constructor (
    private taskService: TaskService,
    private goalService: GoalService,
    private ideasService: IdeaService,
    private userServise: UserService
  ) {

  }

  ngOnInit() {
    this.regDateSubscription = this.userServise.getUserRegistrationDate().subscribe( date => this.registrationDate = date );
    this.minStatSubscription = forkJoin(
      //first row
      this.goalService.getUserGoals().pipe( catchError( error => of( error ) ) ),
      this.taskService.getUserAllTasksAsNumber().pipe( catchError( error => of( error ) ) ),
      this.ideasService.getUserIdeasAsNumber().pipe( catchError( error => of( error ) ) ),
      this.taskService.getDaysToCompleteTasks().pipe( catchError( error => of( error ) ) ),
      //second row
      this.goalService.getUserCompletedGoals().pipe( catchError( error => of( error ) ) ),
      this.taskService.getUserCompletedTasks().pipe( catchError( error => of( error ) ) ),
      this.goalService.getUserGoalsFromIdeas().pipe( catchError( error => of( error ) ) ),
      this.goalService.getUserRate().pipe( catchError( error => of( error ) ) ),
    )
      .subscribe( ( [ goals, tasks, ideas, daysTocompleteTasks,
        completedGoals, completedTasks, ideasToGoals, rate
      ] ) => {
        this.minStaticsDataFirstRow[ 0 ].value = goals;
        this.minStaticsDataFirstRow[ 1 ].value = tasks;
        this.minStaticsDataFirstRow[ 2 ].value = ideas;
        this.minStaticsDataFirstRow[ 3 ].value = daysTocompleteTasks;
        this.minStaticsDataSecondRow[ 0 ].value = completedGoals;
        this.minStaticsDataSecondRow[ 1 ].value = completedTasks;
        this.minStaticsDataSecondRow[ 2 ].value = ideasToGoals;
        this.minStaticsDataSecondRow[ 3 ].value = rate + ' %';
      } );

    this.donutChartSubscription = this.goalService.getUserLastThreeGoalsStatistic()
      .subscribe( data => {
        console.log( data )
        this.donutChart = data
      } );

    this.barChartSubscription = this.goalService.getUserGoalsAndTasksByCategoryAsNumber()
      .subscribe( data => {
        this.barChart.labels.forEach( label => {
          this.barChart.series[ 0 ].value.push( data[ label ] ? data[ label ].goals : 0 );
          this.barChart.series[ 1 ].value.push( data[ label ] ? data[ label ].tasks : 0 );
        } );
      } );

    // this.barChart.labels.forEach( label => {
    //   this.barChart.series[ 0 ].value[ counter ] = data[ 'dataValue' ][ label ].goals;
    //   this.barChart.series[ 1 ].value[ counter ] = data[ 'dataValue' ][ label ].tasks;
    //   counter++;
    // } );

    // const values = Object.keys( ChartData ).map( key => ChartData[ key ] );
    // for ( let chart of values ) {
    //   this.dataChart.push( chart );
    // }
    // this.barChart = this.dataChart.pop();
  }

  ngOnDestroy() {
    if ( this.minStatSubscription ) {
      this.minStatSubscription.unsubscribe();
    }
    if ( this.barChartSubscription ) {
      this.barChartSubscription.unsubscribe();
    }
    if ( this.regDateSubscription ) {
      this.regDateSubscription.unsubscribe();
    }
  }
}
