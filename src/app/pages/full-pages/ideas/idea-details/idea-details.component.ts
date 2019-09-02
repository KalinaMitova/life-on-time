import { Component, OnInit, Input } from '@angular/core';

@Component( {
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: [ './idea-details.component.scss' ]
} )
export class IdeaDetailsComponent implements OnInit {
  @Input( 'idea' ) idea: any;
  @Input( 'isIdeaSelected' ) isIdeaSelected: boolean;

  constructor () { }

  ngOnInit() {
  }

}
