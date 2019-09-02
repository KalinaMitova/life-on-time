import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SetHeadersInterceptor implements HttpInterceptor {
  constructor (
    private authService: AuthService
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken( 'token' );
    const imgToken = '20011d8c7e6a5f1654514c77bfdba8cdbeb35885';

    if ( !req.url.includes( '/auth/' ) && !req.url.includes( '/wp-json/wp/' ) ) {
      let request;
      if ( req.url.includes( '/api.imgur.com/' ) ) {
        request = req.clone( {
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${imgToken}`,
          },
          withCredentials: true
        } );
        console.log( request );
      } else {
        request = req.clone( {
          setHeaders: {
            'Content-Type': 'application/json',
            'Auth-Token': token,
            //'Authorization': `Bearer ${authToken}`,
          },
          withCredentials: true
        } );
        console.log( request );
      }

      return next.handle( request );
    }

    return next.handle( req );
  }
}
