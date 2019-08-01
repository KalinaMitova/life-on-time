import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';

const ChartData: any = require( '../../../../shared/data/chartsData.json' );

@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  private dataChart = [];
  private barChart;

  constructor () {
    for ( let chart of Object.values( ChartData ) ) {
      this.dataChart.push( chart );
    }
    this.barChart = this.dataChart.pop();
  }

  ngOnInit() {
  }

}
