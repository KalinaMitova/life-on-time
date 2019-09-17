import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from "../models/category";
import { UserAppInfo } from '../models/userAppInfo';

const BASE_URL = environment.apiUrl + 'api/me';
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor (
    private http: HttpClient
  ) { }

  getUserAppInfo(): Observable<UserAppInfo> {
    debugger;
    return this.http.get<UserAppInfo>( BASE_URL )
      .pipe(
        map( data => {
          console.log( data );
          debugger;
          const categoriesData = data[ 'data' ][ 'categories' ];
          const categories = [];
          Object.entries<string>( categoriesData ).forEach( ( [ id, title ] ) => {
            const category = {
              id,
              title,
              pathEnd: `${title.toLowerCase().split( ' ' ).join( '-' )}`
            }
            categories.push( category );
          } )
          const userInfo: UserAppInfo = {
            categories: categories,
            appType: data[ 'data' ][ 'applicationType' ][ 'name' ],
            maxGoals: data[ 'data' ][ 'maxGoals' ],
            maxTasks: data[ 'data' ][ 'maxTasks' ]
          }
          return userInfo;
        } )
      )
  }

  getUserRegistrationDate(): Observable<string> {
    return this.http.get( BASE_URL )
      .pipe(
        map( data => {
          const regDateAsArray = ( ( data[ 'data' ][ 'created_at' ] ).split( ' ' )[ 0 ] ).split( '-' );
          const year = regDateAsArray[ 0 ];
          const mm = regDateAsArray[ 1 ];
          const day = regDateAsArray[ 2 ];
          return `${day} ${months[ mm - 1 ]} ${year}`;
        } ) )
  }

  getUserAvailableCategoriesAndUserAppType(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>( BASE_URL )
      .pipe(
        map( data => {
          const categoriesData = data[ 'data' ][ 'categories' ];
          const categories = [];
          Object.entries<string>( categoriesData ).forEach( ( [ id, title ] ) => {
            const category = {
              id,
              title,
              pathEnd: `${title.toLowerCase().split( ' ' ).join( '-' )}`
            }
            categories.push( category );
          } )
          return categories
        } )
      );
  }

  getUserAllowedNumbetGoalsAndTasks() {
    return this.http.get( BASE_URL )
      .pipe(
        map( data => {
          return {
            createdGoals: data[ 'createdGoals' ],
            createdTasks: data[ 'createdTasks' ],
            maxGoals: data[ 'maxGoals' ],
            maxTasks: data[ 'maxTasks' ],
          }
        } )
      )
  }

  getUserAppType(): Observable<string> {
    return this.http.get<string>( BASE_URL )
      .pipe(
        map( data => data[ 'data' ][ 'applicationType' ][ 'name' ] )
      )
  }

  //get categories from window object
  getCategoriesWindows() {
    return window.categories;
  }
  setCategoriesWindow( categories: Array<Category> ) {
    window.categories = categories;
  }
  // setAppTypeToWindow( appType: string ) {
  //   window.appType = appType;
  // }
  // getAppTypeFromWindow() {
  //   return window.appType;
  // }
}
