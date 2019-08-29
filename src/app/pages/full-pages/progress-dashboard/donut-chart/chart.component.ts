import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../../../../shared/models/chart';
// import * as Chartist from 'chartist';

@Component( {
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
} )
export class ChartComponent {
  @Input( 'chart' ) chart: any;

  donutChart: Chart;
  setValue: number;
  doneValue: number;
  overdueValue: number;
  upcomingValue: number;

  ngOnInit() {

    this.setValue = this.chart.series[ 2 ].value;
    this.doneValue = this.chart.series[ 3 ].value;
    this.overdueValue = this.chart.series[ 0 ].value;
    this.upcomingValue = this.chart.series[ 1 ].value;

    const dataChart = { ... this.chart };
    dataChart.series = dataChart.series.filter( s => s.name !== 'Set' )

    this.donutChart = {
      type: "Pie",
      data: dataChart,
      options: {
        donut: true,
        startAngle: 0,
        labelInterpolationFnc: function ( value ) {
          var total = dataChart.series.reduce( function ( prev, series ) {
            return prev + series.value;
          }, 0 );
          return total;
        }
      },
      // total: dataChart.series.value.sum(),
      events: {
        draw( data: any ): void {
          if ( data.type === 'label' ) {
            if ( data.index === 0 ) {
              data.element.attr( {
                dx: data.element.root().width() / 2,
                dy: data.element.root().height() / 2
              } );
            } else {
              data.element.remove();
            }
          }
        }
      }
    }
  }
}
