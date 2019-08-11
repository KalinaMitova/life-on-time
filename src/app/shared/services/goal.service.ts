import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";

import { Goal } from '../models/goal';

const BASE_URL = environment.apiUrl + "api/goals/";
const ALL_USER_HEALTH_GOALS_END = "";
const ALL_USER_DEVELOPMENT_GOALS_END = "";
const ALL_USER_RELATIONSHIPS_GOALS_END = "";
const ALL_USER_PHYSICAL_ACTIVITY_GOALS_END = "";
const ALL_USER_FINANCIAL_GOALS_END = "";
const USER_COMPLETED_GOALS_END = "mecompleted";
const USER_RATE_END = "myrate";
const USER_GOALS_FROM_IDEAS_END = "mefromideas";
const USER_GOALS_END = "me";

@Injectable( {
  providedIn: 'root'
} )
export class GoalService {

  constructor (
    private http: HttpClient
  ) {
  }

  getUserGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL + USER_GOALS_END );
  }

  getAllHealthGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL );
  }

  getAllDevelopmentGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL );
  }
  getAllRelationshipsGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL );
  }

  getAllPhysicalActivityGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL );
  }

  getAllFinancialGoals(): Observable<Array<Goal>> {
    return this.http.get<Array<Goal>>( BASE_URL );
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

  putEditGoal( id: number, goal: Goal ) {
    return this.http.put( BASE_URL + id, goal );
  }

  deleteGoal( id: number ) {
    return this.http.delete( BASE_URL + id );
  }

}
