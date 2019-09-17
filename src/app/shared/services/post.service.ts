import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, MediaType } from '../models/blogPost';
import { map } from 'rxjs/operators';

import { WellbeingInfo } from '../../shared/models/wellbeingInfo';

const BASE_URL = 'https://lotweb.cweb.bg/wp-json/wp/v2/'

const LAST_4_POSTS_END_URL = 'posts?per_page=4';
const MEDIA_END_URL = 'media/'
const WELLBEING_END_URL = 'wellbeing'

@Injectable( {
  providedIn: 'root'
} )
export class PostService {

  constructor (
    private http: HttpClient
  ) { }

  getLats4Posts(): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>( BASE_URL + LAST_4_POSTS_END_URL )
      .pipe(
        map( posts => {
          return posts.map( post => {
            const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
            const blogPost: BlogPost = {
              id: post[ 'id' ],
              date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
              title: post[ 'title' ][ 'rendered' ],
              imageUrl: '',
              mediaType: MediaType.image,
              mediaId: post[ 'featured_media' ],
              content: post[ 'content' ][ 'rendered' ].length > 200 ? `${post[ 'content' ][ 'rendered' ].substring( 0, 200 )} ...` : `${post[ 'content' ][ 'rendered' ]}`,
              link: post[ 'link' ],
            };
            return blogPost;
          } )
        } )
      );
  }
  getPostMedia( mediaId: string ): Observable<string> {
    return this.http.get( BASE_URL + MEDIA_END_URL + mediaId )
      .pipe(
        map( media => media[ 'guid' ][ 'rendered' ] )
      )
  }

  getWellbeingPostByCAtegoryAndAppType( appType: string, wellbeingCategory: string ): Observable<Array<BlogPost>> {
    const options = {
      params: {
        wellbeing_apps: WellbeingInfo.appId[ appType ],
        wellbeing_categories: WellbeingInfo.categoryId[ wellbeingCategory ],
      }
    }
    return this.http
      .get<Array<BlogPost>>( BASE_URL + WELLBEING_END_URL, options )
      .pipe(
        map( posts => {
          return posts.map( post => {
            const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
            //contentTypeId: {
            // video: 14,
            //   publication: 19,
            //     audio: 20,
            //}
            const mediaType = this.setMediaType( post[ 'wellbeing_type' ][ 0 ] );
            const blogPost: BlogPost = {
              id: post[ 'id' ],
              date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
              mediaType: mediaType,
              title: post[ 'title' ][ 'rendered' ],
              content: post[ 'content' ][ 'rendered' ],
              link: post[ 'link' ],
            };
            if ( mediaType === MediaType.image ) {
              blogPost.mediaId = post[ 'featured_media' ];
            }
            return blogPost;
          } )
        } )
      )
  }

  private setMediaType( mediaTypeId: number ): MediaType {
    switch ( mediaTypeId ) {
      case 14: return MediaType.video;
      case 19: return MediaType.image;
      case 20: return MediaType.audio;
      default: return MediaType.image;
    }
  }

}
