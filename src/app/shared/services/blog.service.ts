import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogPost';
import { map } from 'rxjs/operators';

const BASE_URL_LAST_4_POSTS = 'https://lotweb.cweb.bg/wp-json/wp/v2/posts?per_page=4';
const URL_SINGLE_POST = 'http://lotweb.cweb.bg/wp-json/wp/v2/posts/';
const MEDIA_URL = 'https://lotweb.cweb.bg/wp-json/wp/v2/media/'

@Injectable( {
  providedIn: 'root'
} )
export class BlogService {

  constructor (
    private http: HttpClient
  ) { }

  getLats4Posts(): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>( BASE_URL_LAST_4_POSTS )
      .pipe(
        map( posts => {
          return posts.map( post => {
            const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
            const blogPost: BlogPost = {
              id: post[ 'id' ],
              date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
              mediaId: post[ 'featured_media' ],
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

  getPostImage( id ): Observable<string> {
    return this.http.get( MEDIA_URL + id )
      .pipe(
        map( post => post[ 'guid' ][ 'rendered' ] )
      )
  }

}
