import { Component, OnInit } from '@angular/core';

const ChartData: any = require( '../../../../shared/data/chartsData.json' );

@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  private dataChart: [ any ] = [ 0 ];

  constructor () {
    for ( let chart of Object.values( ChartData ) ) {
      this.dataChart.push( chart );
    }
    this.dataChart.shift();
    console.log( this.dataChart );
  }

  ngOnInit() {
  }

}
