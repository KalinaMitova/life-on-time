import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const BASE_URL = environment.apiUrl + 'api/me/users';
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor (
    private http: HttpClient
  ) { }

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
}
