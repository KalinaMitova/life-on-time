import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'app/shared/models/blogPost';

@Component( {
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: [ './single-post.component.scss' ]
} )
export class SinglePostComponent implements OnInit {

  @Input( 'post' ) post: BlogPost;

  constructor () { }

  ngOnInit() {
  }

}
