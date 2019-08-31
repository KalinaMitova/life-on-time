import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'

const BASE_URL = environment.apiUrl + 'api/applicationtypes';

@Injectable( {
  providedIn: 'root'
} )

export class ApplicationService {

  constructor (
    private http: HttpClient
  ) { }

  getAplicationTypes(): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL );
  }
}
