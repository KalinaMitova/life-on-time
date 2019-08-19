import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";

import { Task } from '../../shared/models/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiUrl + 'api/me/tasks/';
const BASE_CRUD_URL = '/api/tasks/';
//in environment
//const BASE_CRUD_URL = environment.apiUrl + 'api/tasks/';
const USER_COMPLETED_TASKS_END = 'completed';
const USER_DAYS_LAST_TASKS_FINISH_END = 'dayscompletelastaction';

@Injectable( {
  providedIn: 'root'
} )
export class TaskService {

  constructor (
    private http: HttpClient
  ) { }

  getUserAllTasks() {
    return this.http.get( BASE_URL );
  }

  getUserAllTasksAsNumber() {
    return this.http.get( BASE_URL )
      .pipe(
        map( tasks => tasks[ 'data' ].taskNumber )
      );
  }

  getUserCompletedTasks(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_COMPLETED_TASKS_END )
      .pipe(
        map( tasks => tasks[ 'dataValue' ].number )
      );
  }

  getDaysToCompleteTasks(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_DAYS_LAST_TASKS_FINISH_END )
      .pipe(
        map( days => days[ 'dataValue' ].days )
      );
  }

  getTaskById( id: string ): Observable<Task> {
    return this.http.get<Task>( BASE_CRUD_URL + id );
  }

  putEditTaskById( id: string, task: Task ) {
    return this.http.put( '/api/tasks' + id, task );
  }

  deleteTaskById( id: string ) {
    return this.http.delete( BASE_CRUD_URL + id );
  }

  postCreateTask( task: Task ) {
    return this.http.post( '/api/tasks', task );
  }
}
