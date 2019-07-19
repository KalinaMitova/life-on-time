import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SetHeadersInterceptor implements HttpInterceptor {
  constructor (
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    if ( !req.url.includes( '/auth/' ) ) {
      const request = req.clone( {
        setHeaders: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      } );
      console.log( request );
      return next.handle( request );
    }

    return next.handle( req );
  }
}
