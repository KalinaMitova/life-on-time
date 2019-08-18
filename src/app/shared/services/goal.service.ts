import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "environments/environment";
import { Goal } from '../models/goal';


const BASE_URL = environment.apiUrl + "api/me/goals/";
const USER_COMPLETED_GOALS_END = "completed";
const USER_RATE_END = "rate";
const USER_GOALS_FROM_IDEAS_END = "fromideas";
const USER_LAST_THREE_GOALS_END = "lastthree";
const USER_GOALS_END = "bycategoryall";
const USER_GOALS_TASKS_END = "bycategory";

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
              let goalDateAsString = goal.until_date.split( '-' );
              goal.until_date = {
                day: Number( goalDateAsString[ 2 ] ),
                month: Number( goalDateAsString[ 1 ] ),
                year: Number( goalDateAsString[ 0 ] )
              }
              goal.tasks.map( task => {
                let taskDateAsString = task.until_date.split( '-' );
                task.until_date = {
                  day: Number( taskDateAsString[ 2 ] ),
                  month: Number( taskDateAsString[ 1 ] ),
                  year: Number( taskDateAsString[ 0 ] )
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
        map( goals => goals[ 'dataValue' ] )
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

  getUserGoalsAndTasksByCategoryAsNumber() {
    return this.http.get( BASE_URL + USER_GOALS_TASKS_END )
      .pipe(
        map( data => data[ 'dataValue' ] )
      );
  }

  postCreateGoal( goal: Goal ) {
    return this.http.post( BASE_URL, goal );
  }

  getGoalById( id: number ): Observable<Goal> {
    return this.http.get<Goal>( BASE_URL + 'id' );
  }

  putEditGoalById( id: number, goal: Goal ) {
    return this.http.put( BASE_URL + id, goal );
  }

  deleteGoalById( id: number ) {
    return this.http.delete( BASE_URL + id );
  }

}
