import { Component, OnInit, Input } from '@angular/core';
import { MinStatisticCard } from 'app/shared/models/minStatisticCard';

@Component( {
  selector: 'app-min-statistic-card',
  templateUrl: './min-statistic-card.component.html',
  styleUrls: [ './min-statistic-card.component.scss' ]
} )
export class MinStatisticCardComponent implements OnInit {
  @Input( 'stat' ) stat: MinStatisticCard;

  constructor () {
  }

  ngOnInit() {
  }

}
