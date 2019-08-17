import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";

import { Goal } from '../models/goal';
import { map, filter } from 'rxjs/operators';
import { TaskService } from './task.service';

const BASE_URL = environment.apiUrl + "api/me/goals/";
const ALL_USER_HEALTH_GOALS_END = "";
const ALL_USER_DEVELOPMENT_GOALS_END = "";
const ALL_USER_RELATIONSHIPS_GOALS_END = "";
const ALL_USER_PHYSICAL_ACTIVITY_GOALS_END = "";
const ALL_USER_FINANCIAL_GOALS_END = "";
const USER_COMPLETED_GOALS_END = "completed";
const USER_RATE_END = "rate";
const USER_GOALS_FROM_IDEAS_END = "fromideas";
const USER_LAST_THREE_GOALS_END = "lastthree";
const USER_GOALS_END = "bycategoryall";

@Injectable( {
  providedIn: 'root'
} )
export class GoalService {

  constructor (
    private http: HttpClient
  ) {
  }

  getUserGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL );
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

  getUserCompletedGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL + USER_COMPLETED_GOALS_END );
  }
  getUserGoalsFromIdeas(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL + USER_GOALS_FROM_IDEAS_END );
  }
  getUserRate(): Observable<number> {
    return this.http.get<number>( BASE_URL + USER_RATE_END );
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
