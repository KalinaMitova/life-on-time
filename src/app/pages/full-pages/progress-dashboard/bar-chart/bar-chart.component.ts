import { Component, OnInit, Input } from '@angular/core';
import { Chart } from "../../../../shared/models/chart";
import * as Chartist from 'chartist';

@Component( {
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ]
} )
//, OnChanges
export class BarChartComponent implements OnInit {
  @Input() chart: Chartist.IChartistData;
  private barChart: Chart = {
    type: 'Bar',
    data: null,
    options: {
      seriesBarDistance: 21,
      axisX: {
        showGrid: false, offset: 100
      },
      axisY: {
        scaleMinSpace: 30,
      },
    },
  }
  ngOnInit() {
    this.barChart.data = this.chart;
  }
}
