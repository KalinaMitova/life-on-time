import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { Idea } from '../models/idea';
import { Observable } from 'rxjs';

const BASE_URL = environment.apiUrl + 'api/ideas/';
const USER_IDEAS_END = 'me';

@Injectable( {
  providedIn: 'root'
} )
export class IdeaService {

  constructor (
    private http: HttpClient
  ) { }

  getUserIdeas(): Observable<Array<Idea>> {
    return this.http.get<Array<Idea>>( BASE_URL + USER_IDEAS_END );
  }

  getIdeaById( id: number ): Observable<Idea> {
    return this.http.get<Idea>( BASE_URL + 'id' );
  }

  putEditIdeaById( id: number, idea: Idea ) {
    return this.http.put( BASE_URL + 'id', idea );
  }

  deletIdeaById( id: number ) {
    return this.http.delete( BASE_URL + 'id' );
  }

  postCreateIdea( idea: Idea ) {
    return this.http.post( BASE_URL, idea );
  }
}
