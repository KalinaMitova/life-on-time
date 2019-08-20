import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart } from "../../../../shared/models/chart";

@Component( {
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ]
} )
export class BarChartComponent implements OnInit, OnChanges {

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
  ngOnChanges( changes: import( "@angular/core" ).SimpleChanges ): void {
    throw new Error( "Method not implemented." );
  }
}
