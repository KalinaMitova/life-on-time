import { Component, OnInit } from '@angular/core';
import { minStatisticData } from '../../../../shared/data/minStatisticFirstRowData';

//Declarations
declare var require: any;
const ChartData: any = require( 'app/shared/data/chartsData.json' );

@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  private dataChart = [];
  private barChart;
  private minStaticsDataFirstRow = minStatisticData.firstRow;
  private minStaticsDataSecondRow = minStatisticData.secondRow;

  constructor () {

  }


  ngOnInit() {
    const values = Object.keys( ChartData ).map( key => ChartData[ key ] );
    for ( let chart of values ) {
      this.dataChart.push( chart );
    }
    this.barChart = this.dataChart.pop();
  }

}
