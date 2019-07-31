import { Component, OnInit, Input } from '@angular/core';
import * as Chartist from 'chartist';

declare var require: any;
require( 'chartist-plugin-legend' );

import { Chart } from '../../../../shared/models/chart';


@Component( {
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
} )
export class ChartComponent {
  @Input( 'chart' ) chart: any;

  private Chart: Chart;

  ngOnInit() {
    const dataChart = this.chart;
    this.Chart = {
      type: dataChart.type,
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

    //   if ( this.Chart.type === 'Bar' ) {
    //     this.Chart.options = {
    //       seriesBarDistance: 21,
    //       plugins: [
    //         Chartist.plugins.legend( {
    //           position: 'bottom'
    //         } )
    //       ],
    //       axisX: {
    //         showGrid: false, offset: 100
    //       },
    //       axisY: {
    //         scaleMinSpace: 30,
    //       }
    //     }
    //   }
    // }
  }
}
