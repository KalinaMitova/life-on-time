import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

import { environment } from "environments/environment";
import { Goal } from '../models/goal';
import { GoalCreate } from '../models/goalCreate';
import { BarChartData } from '../models/barChartData';


const BASE_URL = environment.apiUrl + "api/me/goals";
//const BASE_URL_FOR_ENDPOINTS = environment.apiUrl + "api/me/goals/";
//const BASE_CRUD_URL = "/api/goals/";
const BASE_CRUD_URL = environment.apiUrl + "api/goals";
const USER_COMPLETED_GOALS_END = "/completed";
const USER_RATE_END = "/rate";
const USER_GOALS_FROM_IDEAS_END = "/fromideas";
const USER_LAST_THREE_GOALS_END = "/lastthree";
const USER_GOALS_END = "/bycategoryall";
const USER_GOALS_TASKS_END = "/bycategory";

@Injectable( {
  providedIn: 'root'
} )
export class GoalService {

  constructor (
    private http: HttpClient
  ) {
  }

  getUserGoals(): Observable<Number> {
    return this.http.get<Array<Goal>>( BASE_URL )
      .pipe(
        map( goals => goals[ 'dataValue' ].goalsNumber )
      );
  }

  getGoalsByCategory( category: string ): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL + USER_GOALS_END )
      .pipe(
        map( data => {
          if ( data[ 'dataValue' ][ category ] ) {
            return data[ 'dataValue' ][ category ][ 'goals' ].map( goal => {
              const goalLeftDays = Math.round( ( Date.now() - +( new Date( goal.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );

              goal.goalLeftDays = goalLeftDays;
              if ( goal.until_date ) {
                const goalDueDateAsString = goal.until_date.split( '-' );
                goal.until_date = {
                  day: Number( goalDueDateAsString[ 2 ] ),
                  month: Number( goalDueDateAsString[ 1 ] ),
                  year: Number( goalDueDateAsString[ 0 ] )
                };
              }

              if ( goal.created_at ) {
                const goalCreatedDateAsString = ( goal.created_at.split( ' ' ) )[ 0 ].split( '-' );
                goal.created_at = {
                  day: Number( goalCreatedDateAsString[ 2 ] ),
                  month: Number( goalCreatedDateAsString[ 1 ] ),
                  year: Number( goalCreatedDateAsString[ 0 ] )
                };
              }

              goal.tasks.map( task => {
                const taskLeftDays = Math.round( ( Date.now() - +( new Date( task.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );
                task.taskLeftDays = taskLeftDays;
                const taskDueDateAsString = task.until_date.split( '-' );
                task.until_date = {
                  day: Number( taskDueDateAsString[ 2 ] ),
                  month: Number( taskDueDateAsString[ 1 ] ),
                  year: Number( taskDueDateAsString[ 0 ] )
                }
                return task;
              } )
              return goal;
            } )
          } else {
            return [];
          }
        } )
      );
  }

  getUserLastThreeGoalsStatistic(): Observable<Array<any>> {
    return this.http.get<Array<any>>( BASE_URL + USER_LAST_THREE_GOALS_END )
      .pipe(
        map( goals => {
          const goalsObj = goals[ 'data' ];
          const goalsArray = Object.keys( goalsObj ).map( key => goalsObj[ key ] );
          return goalsArray
            .map( g => {
              const goal = {
                goal: g.name,
                series: [
                  {
                    name: "Overdue",
                    className: "ct-overdue",
                    value: g.overdue
                  },
                  {
                    name: "Upcoming",
                    className: "ct-upcoming",
                    value: g.upcoming
                  },
                  {
                    name: "Set",
                    className: "ct-set",
                    value: g.set
                  },
                  {
                    name: "Done",
                    className: "ct-done",
                    value: g.done
                  }
                ]
              }
              return goal;
            } )
        } )
      )
  }

  getUserCompletedGoals(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_COMPLETED_GOALS_END )
      .pipe(
        map( goals => goals[ 'dataValue' ].number )
      );
  }

  getUserGoalsFromIdeas(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_GOALS_FROM_IDEAS_END )
      .pipe(
        map( goals => goals[ 'dataValue' ].number )
      );
  }

  getUserRate(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_RATE_END )
      .pipe(
        map( rate => rate[ 'dataValue' ].percent )
      );
  }

  getUserGoalsAndTasksByCategoryAsNumber(): Observable<BarChartData> {
    return this.http.get<BarChartData>( BASE_URL + USER_GOALS_TASKS_END )
      .pipe(
        map( data => {

          const barData = data[ 'dataValue' ]
          const barChart = {
            labels: window.categories.map( c => c.title ),
            series: [ {
              "name": "Goals",
              "value": []
            }, {
              "name": "Actions",
              "value": []
            } ]
          };
          barChart.labels.forEach( label => {
            barChart.series[ 0 ].value.push( barData[ label ] ? barData[ label ].goals : 0 );
            barChart.series[ 1 ].value.push( barData[ label ] ? barData[ label ].tasks : 0 );
          } );
          return barChart;
        } )
      );
  }

  postCreateGoal( goal: GoalCreate ) {
    return this.http.post( BASE_CRUD_URL, goal );
  }

  getGoalById( id: number ): Observable<Goal> {
    return this.http.get<Goal>( BASE_URL + `/${id}` );
  }

  putEditGoalById( id: string, goal: GoalCreate ) {
    return this.http.put( `${BASE_CRUD_URL}/${id}`, goal );
  }

  deleteGoalById( id: string ) {
    return this.http.delete( BASE_CRUD_URL + `/${id}` );
  }

}
