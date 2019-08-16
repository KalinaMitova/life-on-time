import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'

const BASE_URL = environment.apiUrl;
//const BASE_URL = 'http://136.244.71.69/';
// const CREATE_END_URL = "create";
// const EDIT_END_URL = "edit/";
// const DELETE_END_URL = "delete/";
// const ALL_END_URL = "all";
const CATEGORIES_END_URL = 'api/categories';
const APLICATION_TYPES__END_URL = 'api/applicationtypes';

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

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + CATEGORIES_END_URL );
  }
  getAplicationTypes(): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + APLICATION_TYPES__END_URL );
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
