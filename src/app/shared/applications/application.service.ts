import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'

const BASE_URL = environment.apiUrl + 'api/applicationtypes';
// const CREATE_END_URL = "create";
// const EDIT_END_URL = "edit/";
// const DELETE_END_URL = "delete/";
// const ALL_END_URL = "all";
const goals_END_URL = '/api/goals';

@Injectable( {
  providedIn: 'root'
} )
export class ApplicationService {

  constructor (
    private http: HttpClient
  ) { }

  // createCategory( category: CreateCategory ) {
  //   return this.http.post( BASE_URL + CREATE_END_URL, category )
  // }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL );
  }
  getAllGoals(): Observable<any[]> {
    return this.http.get<any[]>( goals_END_URL );
  }

  // getById( id: string ): Observable<Category> {
  //   return this.http.get<Category>( BASE_URL + `${id}`
  //   );
  // }

  // editCategory( body: Category, id: string ) {
  //   return this.http.put( BASE_URL + EDIT_END_URL + `${id}`, body,
  //   );
  // }

  // deleteCategory( id: string ) {
  //   return this.http.delete( BASE_URL + DELETE_END_URL + `${id}`,
  //   );
  // }
}
