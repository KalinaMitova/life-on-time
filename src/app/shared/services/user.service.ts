import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from "../models/category";
import { UserAppInfo } from '../models/userAppInfo';

const BASE_URL = environment.apiUrl + 'api/me';
const CALENDAR_END = '/calendar';
const FULL_CALENDAR_END = '/fullcalendar';
// api / me / calendar -> Връща само масив от таскове и цели
// api / me / fullcalendar / -> Връща масива с всичките данни от - 5 до + 5 години
// year = 2019
// api / me / fullcalendar / { year } -> Връща масива с всичките данни само за 2019, или която си задала

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor (
    private http: HttpClient
  ) { }

  getUserAppInfo(): Observable<UserAppInfo> {
    return this.http.get<UserAppInfo>( BASE_URL )
      .pipe(
        map( data => {
          console.log( data );
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

  getIdeasAndGoalsDueDate() {
    return this.http.get( BASE_URL + CALENDAR_END )
      .pipe(
        map( data => {
          const items = [];
          data[ 'data' ][ 'tasks' ].forEach( task => {
            items.push( {
              title: task[ 'title' ],
              date: task[ 'until_date' ],
              url: `goals/${task[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}#a-${task.id}`,
              backgroundColor: "#009DA0",
              borderColor: "#009DA0",
              //textColor: "#FF8D60",
            } )
          } )
          data[ 'data' ][ 'goals' ].forEach( goal => {
            items.push( {
              title: goal[ 'title' ],
              date: goal[ 'until_date' ],
              url: `goals/${goal[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}#g-${goal.id}`,
              backgroundColor: "#FF8D60",
              borderColor: "#FF8D60",
              //textColor: "#009DA0",
            } )
          } )

          return items;
        } )
      )
  }

  //this end point returns uncompleted goals and tasks due date by years, months and days
  getIdeasAndGoalsDueDateFullCAlendar() {
    return this.http.get( BASE_URL + FULL_CALENDAR_END )
      .pipe(
        map( data => {
          const items = [];
          const dataArray = Object.keys( data[ 'data' ] ).map( key => data[ 'data' ][ key ] );
          dataArray.map( year => {
            const yearsArray = Object.keys( year ).map( key => year[ key ] );
            yearsArray
              .filter( m => !( m instanceof Array ) )
              .map( m => {
                const monthArray = Object.keys( m ).map( key => m[ key ] );
                monthArray.map( day => {
                  if ( day[ 'tasks' ] ) {
                    day[ 'tasks' ].forEach( task => {
                      items.push( {
                        title: task[ 'title' ],
                        date: task[ 'until_date' ],
                        url: `goals/${task[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}`,
                        backgroundColor: "#009DA0",
                        borderColor: "#009DA0",
                        //textColor: "#FF8D60",
                      } )
                    } )
                  }
                  if ( day[ 'goals' ] ) {
                    day[ 'goals' ].forEach( goal => {
                      items.push( {
                        title: goal[ 'title' ],
                        date: goal[ 'until_date' ],
                        url: `goals/${goal[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}`,
                        backgroundColor: "#FF8D60",
                        borderColor: "#FF8D60",
                        //textColor: "#009DA0",
                      } )
                    } )
                  }
                  day;
                } );
              } )
          } )
          return items;
        } )
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
