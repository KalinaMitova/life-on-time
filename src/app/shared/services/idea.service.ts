import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { Idea } from '../models/idea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiUrl + 'api/ideas';
const USER_IDEAS_URL = environment.apiUrl + 'api/me/ideas';

@Injectable( {
  providedIn: 'root'
} )
export class IdeaService {

  constructor (
    private http: HttpClient
  ) { }

  getUserIdeas(): Observable<Array<Idea>> {
    return this.http.get<Array<Idea>>( USER_IDEAS_URL )
      .pipe(
        map( data => {
          const ideas = data[ 'data' ][ 'ideas' ];
          if ( ideas instanceof Object ) {
            const ideaValue = Object.keys( ideas ).map( key => ideas[ key ] );
            return ideaValue.map( idea => {
              const ideaCreatedDateArray =
                ( idea[ 'created_at' ].split( ' ' )[ 0 ] ).split( '-' );
              const dd = ideaCreatedDateArray[ 2 ];
              const mm = ideaCreatedDateArray[ 1 ];
              const yyyy = ideaCreatedDateArray[ 0 ];
              idea[ 'created_at' ] = `${dd}/${mm}/${yyyy}`;
              return idea;
            } )
          } else {
            return ideas.map( idea => {
              const ideaCreatedDateArray =
                ( idea[ 'created_at' ].split( ' ' )[ 0 ] ).split( '-' );
              const dd = ideaCreatedDateArray[ 2 ];
              const mm = ideaCreatedDateArray[ 1 ];
              const yyyy = ideaCreatedDateArray[ 0 ];
              idea[ 'created_at' ] = `${dd}/${mm}/${yyyy}`;
              return idea;
            } )
          }
        }
        ) );
  }

  getUserIdeasAsNumber(): Observable<Number> {
    return this.http.get<Number>( USER_IDEAS_URL )
      .pipe(
        map( ideas => {
          return ideas[ 'dataValue' ].ideasNumber
        } )
      );
  }

  getIdeaById( id: string ): Observable<Idea> {
    return this.http.get<Idea>( BASE_URL + `/${id}` );
  }

  putEditIdeaById( id: string, idea: Idea ) {
    return this.http.put( BASE_URL + `/${id}`, idea );
  }

  deletIdeaById( id: string ) {
    return this.http.delete( BASE_URL + `/${id}` );
  }

  postCreateIdea( idea: Idea ) {
    return this.http.post( BASE_URL, idea );
  }
}
