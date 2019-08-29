import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogPost';
import { map } from 'rxjs/operators';

const BASE_URL = "https://lotweb.cweb.bg/wp-json/wp/v2/posts?per_page=4"

@Injectable( {
  providedIn: 'root'
} )
export class BlogService {

  constructor (
    private http: HttpClient
  ) { }

  getLats4Posts(): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>( BASE_URL )
      .pipe(
        map( posts => {
          return posts.map( post => {
            const blogPost: BlogPost = {
              title: post[ 'title' ][ 'rendered' ],
              image: '',
              text: post[ 'content' ].rendered.length > 200 ? `${post[ 'content' ].rendered.substring( 0, 200 )} ...` : `${post[ 'content' ].rendered}`,
              link: post[ 'link' ],
            };
            return blogPost;
          } )
        } )
      );
  }
}
