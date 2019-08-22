import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { GoalService } from 'app/shared/services/goal.service';
import { Goal } from 'app/shared/models/goal';
import { ModalService } from "app/shared/services/modal.service";
import { EventService } from 'app/shared/services/event.service';
import { TaskService } from 'app/shared/services/task.service';
import { ActionInfo } from 'app/shared/models/actionInfo';
import { ItemInfo } from 'app/shared/models/itemInfo';
import { GoalCreate } from 'app/shared/models/goalCreate';
import { TaskCreate } from 'app/shared/models/taskCreate';
import { GOALS_CATEGORIES } from "app/shared/data/goalsCategories";



@Component( {
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: [ './goals-page.component.scss' ]
} )
export class GoalsPageComponent implements OnInit {
  @ViewChild( 'type', { static: false } ) type: any;

  private currentGoalPage;
  private path: string;
  private goals$: Observable<Array<Goal>>;
  private deleteSubscription: Subscription;
  private createGoalSubscription: Subscription;
  private createTaskSubscription: Subscription;
  private editGoalSubscription: Subscription;
  private editTaskSubscription: Subscription;

  constructor (
    private modalService: ModalService,
    private route: ActivatedRoute,
    private goalService: GoalService,
    private taskService: TaskService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig.path;
    this.currentGoalPage = GOALS_CATEGORIES[ this.path ];
    this.loadPageGoals();
    this.eventService.on( 'confirm create/edit', ( actionInfo => {
      this.mapAction( actionInfo )
    } ) );
    this.eventService.on( 'confirm delete', ( itemInfo => this.deleteItem( itemInfo ) ) )
  }

  private mapAction( actionInfo: ActionInfo ) {
    if ( actionInfo.actionType === 'create' ) {
      if ( actionInfo.itemType === 'goal' ) {
        this.createGoal( actionInfo.form );
      } else if ( actionInfo.itemType === 'action' ) {
        this.createTask( actionInfo.form, actionInfo.goalId )
      }

    } else if ( actionInfo.actionType === 'edit' ) {
      if ( actionInfo.itemType === 'goal' ) {
        this.editGoal( actionInfo.form, actionInfo.itemId );
      } else if ( actionInfo.itemType === 'action' ) {
        this.editTask( actionInfo.form, actionInfo.itemId );
      }
    }
  }

  private createGoal( form ) {
    let goal: GoalCreate = form.value;
    const date = form.value.until_date;
    goal.until_date = this.getDate( date.day, date.month, date.year, '-' );
    goal.category_id = this.currentGoalPage.categoryId;
    this.createGoalSubscription = this.goalService.postCreateGoal( goal )
      .subscribe( data => {
        if ( form.valid ) {
          form.reset();
          this.loadPageGoals();
        }
      } )
  }

  private createTask( form, goalId: string ) {
    let task: TaskCreate = form.value;
    task.goal_id = goalId;
    const date = form.value.until_date;
    task.until_date = this.getDate( date.day, date.month, date.year, '-' )
    this.createTaskSubscription = this.taskService.postCreateTask( task )
      .subscribe( data => {
        if ( form.valid ) {
          form.reset();
          this.loadPageGoals();
        }
      } )
  }

  private editGoal( form, goalId: string ) {
    const goal: GoalCreate = form.value;
    const date = form.value.until_date;
    goal.until_date = this.getDate( date.day, date.month, date.year, '-' )
    this.editTaskSubscription = this.goalService.putEditGoalById( goalId, goal )
      .subscribe( data => {
        if ( form.valid ) {
          form.reset();
          this.loadPageGoals();
        }
      } )
  }

  private editTask( form, taskId: string ) {
    let task: TaskCreate = form.value;
    const date = form.value.until_date;
    task.until_date = this.getDate( date.day, date.month, date.year, '-' )
    this.editTaskSubscription = this.taskService.putEditTaskById( taskId, task )
      .subscribe( data => {
        if ( form.valid ) {
          form.reset();
          this.loadPageGoals();
        }
      } )
  }

  private deleteItem( itemInfo: ItemInfo ) {
    if ( itemInfo.itemType === 'goal' ) {
      this.deleteSubscription = this.goalService.deleteGoalById( itemInfo.itemId )
        .subscribe( data => {
          this.loadPageGoals();
        } )
    } else if ( itemInfo.itemType === 'action' ) {
      this.deleteSubscription = this.taskService.deleteTaskById( itemInfo.itemId )
        .subscribe( data => {
          this.loadPageGoals();
        } )
    }
  }

  private loadPageGoals() {
    this.goals$ = this.goalService.getGoalsByCategory( this.currentGoalPage.title );
  }

  private getDate( dd, mm, yyyy, separator: string ) {
    if ( dd < 10 ) dd = '0' + dd;
    if ( mm < 10 ) mm = '0' + mm;
    return ( yyyy + separator + mm + separator + dd );
  };

  openModal( name: string, itemType: string, actionTypeOrTitle: string, item?: any ) {
    this.modalService.open( name, itemType, actionTypeOrTitle, item );
  }

  ngOnDestroy() {
    if ( this.deleteSubscription ) {
      this.deleteSubscription.unsubscribe();
    }
    if ( this.createGoalSubscription ) {
      this.createGoalSubscription.unsubscribe();
    }
    if ( this.createTaskSubscription ) {
      this.createTaskSubscription.unsubscribe()
    }
    if ( this.editGoalSubscription ) {
      this.editGoalSubscription.unsubscribe();
    }
    if ( this.editTaskSubscription ) {
      this.editTaskSubscription.unsubscribe()
    }
  }
}
