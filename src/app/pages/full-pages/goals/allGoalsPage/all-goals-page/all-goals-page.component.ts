import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoalService } from 'app/shared/services/goal.service';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';

@Component( {
  selector: 'app-all-goals-page',
  templateUrl: './all-goals-page.component.html',
  styleUrls: [ './all-goals-page.component.scss' ]
} )
export class AllGoalsPageComponent implements OnInit {
  @ViewChild( 'allGoals', { static: false } ) allGoals: ElementRef
  public goals$: Observable<Array<any>>;

  constructor (
    private goalService: GoalService,
  ) { }

  ngOnInit() {
    this.goals$ = this.goalService.getAllUserGoals();
  }

  public downloadAsPDF() {
    console.log( this.allGoals );
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function ( element, renderer ) {
        return true;
      }
    };

    const pdfGoals = this.allGoals.nativeElement;
    doc.fromHTML( pdfGoals.innerHTML, 15, 15, {
      width: 170,
      'elementHandlers': specialElementHandlers
    } );
    doc.save( 'all-goals.pdf' );
  }

}
