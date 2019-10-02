import { Component, OnInit } from '@angular/core';
import { GoalService } from 'app/shared/services/goal.service';
import { Observable } from 'rxjs';

@Component( {
  selector: 'app-all-goals-page',
  templateUrl: './all-goals-page.component.html',
  styleUrls: [ './all-goals-page.component.scss' ]
} )
export class AllGoalsPageComponent implements OnInit {
  public goals$: Observable<Array<any>>;

  constructor (
    private goalService: GoalService,
  ) { }

  ngOnInit() {
    this.goals$ = this.goalService.getAllUserGoals();
  }

}
