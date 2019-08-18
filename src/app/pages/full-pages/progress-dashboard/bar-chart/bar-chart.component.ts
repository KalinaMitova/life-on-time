import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from "../../../../shared/models/chart";

@Component( {
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ]
} )
export class BarChartComponent implements OnInit {
  @Input( 'chart' ) chart: any;

  private barChart: Chart;

  ngOnInit() {
    this.barChart = {
      type: 'Bar',
      data: this.chart,
      options: {
        seriesBarDistance: 21,
        axisX: {
          showGrid: false, offset: 100
        },
        axisY: {
          scaleMinSpace: 30,
        },
        // plugins: [
        //   Chartist.plugins.legend( {
        //     position: 'bottom'
        //   } )
        // ],
      },
    };

  }

}
