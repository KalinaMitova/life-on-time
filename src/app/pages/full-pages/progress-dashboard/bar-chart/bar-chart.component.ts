import { Component, OnInit, Input } from '@angular/core';
import * as Chartist from 'chartist';

declare var require: any;
require( 'chartist-plugin-legend' );

import { Chart } from '../../../../shared/models/chart';

@Component( {
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ]
} )
export class BarChartComponent implements OnInit {

  @Input( 'chart' ) chart: any;

  private Chart: Chart;

  ngOnInit() {
    const dataChart = this.chart;
    this.Chart = {
      type: 'Bar',
      data: dataChart,
      options: {
        seriesBarDistance: 21,
        plugins: [
          Chartist.plugins.legend( {
            position: 'bottom'
          } )
        ],
        axisX: {
          showGrid: false, offset: 1
        },
        axisY: {
          scaleMinSpace: 10,
        }
      },
    };
  }

}