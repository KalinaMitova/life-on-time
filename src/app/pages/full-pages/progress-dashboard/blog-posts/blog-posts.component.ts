import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'app/shared/models/blogPost';

@Component( {
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: [ './blog-posts.component.scss' ]
} )

export class BlogPostsComponent implements OnInit {

  posts: Array<BlogPost> = [
    {
      title: 'First Post',
      text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
      image: 'assets/img/photos/06.jpg'
    },
    {
      title: 'Second Post',
      text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
      image: 'assets/img/photos/06.jpg'
    },
    {
      title: 'Third Post',
      text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
      image: 'assets/img/photos/06.jpg'
    },
    {
      title: 'Fourth Post',
      text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
      image: 'assets/img/photos/06.jpg'
    }
  ];

  constructor () { }

  ngOnInit() {
  }

}
