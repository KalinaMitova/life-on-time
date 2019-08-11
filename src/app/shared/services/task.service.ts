import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";

import { Task } from '../../shared/models/task';
import { Observable } from 'rxjs';

const BASE_URL = environment.apiUrl + 'api/tasks/';
const USER_TASKS_END = 'me';
const USER_COMPLETED_TASKS_END = 'mecompleted';
const USER_DAYS_LAST_TASKS_FINISH_END = 'dayscompletelastaction';

@Injectable( {
  providedIn: 'root'
} )
export class TaskService {

  constructor (
    private http: HttpClient
  ) { }

  getUserTasks() {
    return this.http.get( BASE_URL + USER_TASKS_END );
  }

  getUserCompletedTasks() {
    return this.http.get( BASE_URL + USER_COMPLETED_TASKS_END );
  }

  getDaysToCompleteTasks() {
    return this.http.get( BASE_URL + USER_DAYS_LAST_TASKS_FINISH_END );
  }

  getTaskById( id: number ): Observable<Task> {
    return this.http.get<Task>( BASE_URL + 'id' );
  }

  putEditTaskById( id: number, task: Task ) {
    return this.http.put( BASE_URL + 'id', task );
  }

  deletTaskById( id: number ) {
    return this.http.delete( BASE_URL + 'id' );
  }

  postCreateTask( task: Task ) {
    return this.http.post( BASE_URL, task );
  }
}
