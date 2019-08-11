import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";

const BASE_URL = environment.apiUrl + 'api/tasks/';
const USER_TASKS_END = 'me';
const USER_COMPLETED_TASKS_END = 'me/completed';
const USER_DAYS_LAST_TASKS_FINISH_END = 'dayscompletelastaction';

@Injectable( {
  providedIn: 'root'
} )
export class TaskService {

  constructor (
    private http: HttpClient
  ) { }

  getUserTasks() {
    return this.http.get( BASE_URL );
  }
}
