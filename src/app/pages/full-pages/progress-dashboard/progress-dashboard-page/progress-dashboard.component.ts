import { Component, OnInit, OnDestroy, ViewChild, SimpleChange } from '@angular/core';
import { forkJoin, Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { minStatisticData } from '../../../../shared/data/minStatisticFirstRowData';
import { GoalService } from "../../../../shared/services/goal.service";
import { TaskService } from "../../../../shared/services/task.service";
import { IdeaService } from 'app/shared/services/idea.service';

import { UserService } from 'app/shared/services/user.service';
import { BarChartData } from 'app/shared/models/barChartData';


@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  private registrationDate: string;
  donutCharts = [];
  barChart: Observable<BarChartData>;
  minStaticsDataFirstRow = minStatisticData.firstRow;
  minStaticsDataSecondRow = minStatisticData.secondRow;
  private minStatSubscription: Subscription;
  private donutChartSubscription: Subscription;
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
      .subscribe( goals => {
        for ( const key of Object.keys( goals ) ) {
          const goal = {
            goal: goals[ key ].name,
            series: [
              {
                name: "Overdue",
                className: "ct-overdue",
                value: goals[ key ].overdue
              },
              {
                name: "Upcoming",
                className: "ct-upcoming",
                value: goals[ key ].upcoming
              },
              {
                name: "Set",
                className: "ct-set",
                value: goals[ key ].set
              },
              {
                name: "Done",
                className: "ct-done",
                value: goals[ key ].done
              }
            ]
          }
          this.donutCharts.push( goal )
        }
      } );

    this.barChart = this.goalService.getUserGoalsAndTasksByCategoryAsNumber();
  }

  ngOnDestroy() {
    if ( this.minStatSubscription ) {
      this.minStatSubscription.unsubscribe();
    }
    if ( this.donutChartSubscription ) {
      this.donutChartSubscription.unsubscribe();
    }
    if ( this.regDateSubscription ) {
      this.regDateSubscription.unsubscribe();
    }
  }
}
