import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ElementRef } from '@angular/core';
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

  currentGoalPage;
  private path: string;
  goals$: Observable<Array<Goal>>;
  private deleteSubscription: Subscription;
  private createGoalSubscription: Subscription;
  private createTaskSubscription: Subscription;
  private editGoalSubscription: Subscription;
  private editTaskSubscription: Subscription;
  private modalCreateSubscription: Subscription;
  private modalDeleteSubscription: Subscription;
  private modalStatusSubscription: Subscription;

  constructor (
    private modalService: ModalService,
    private route: ActivatedRoute,
    private goalService: GoalService,
    private taskService: TaskService,
    private eventService: EventService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig.path;
    this.currentGoalPage = GOALS_CATEGORIES[ this.path ];
    this.loadPageGoals();
    this.modalCreateSubscription = this.eventService.on( 'confirm create/edit', ( actionInfo => this.mapAction( actionInfo ) ) );
    this.modalDeleteSubscription = this.eventService.on( 'confirm delete', ( itemInfo => this.deleteItem( itemInfo ) ) );
    this.modalStatusSubscription = this.eventService.on( 'change status', ( itemInfo => this.changeStatus( itemInfo ) ) )
  }

  private mapAction( actionInfo: ActionInfo ) {
    if ( actionInfo.actionType === 'create' ) {
      if ( actionInfo.itemType === 'goal' ) {
        this.createGoal( actionInfo.formValue );
      } else if ( actionInfo.itemType === 'action' ) {
        this.createTask( actionInfo.formValue, actionInfo.goalId )
      }

    } else if ( actionInfo.actionType === 'edit' ) {
      if ( actionInfo.itemType === 'goal' ) {
        this.editGoal( actionInfo.formValue, actionInfo.itemId );
      } else if ( actionInfo.itemType === 'action' ) {
        this.editTask( actionInfo.formValue, actionInfo.itemId );
      }
    }
  }

  private createGoal( formValue ) {
    let goal: GoalCreate = formValue;
    const date = formValue.until_date;
    goal.until_date = this.getDate( date.day, date.month, date.year, '-' );
    goal.category_id = this.currentGoalPage.categoryId;
    this.createGoalSubscription = this.goalService.postCreateGoal( goal )
      .subscribe( data => {
        this.loadPageGoals();
      } )
  }

  private createTask( formValue, goalId: string ) {
    let task: TaskCreate = formValue;
    task.goal_id = goalId;
    const date = formValue.until_date;
    task.until_date = this.getDate( date.day, date.month, date.year, '-' );

    this.createTaskSubscription = this.taskService.postCreateTask( task )
      .subscribe( data => {
        this.loadPageGoals();
      } )
  }

  private editGoal( formValue, goalId: string ) {
    const goal: GoalCreate = formValue;
    const date = formValue.until_date;
    goal.until_date = this.getDate( date.day, date.month, date.year, '-' )
    this.editTaskSubscription = this.goalService.putEditGoalById( goalId, goal )
      .subscribe( data => {
        this.loadPageGoals();
      } )
  }

  private editTask( formValue, taskId: string ) {
    let task: TaskCreate = formValue;
    const date = formValue.until_date;
    task.until_date = this.getDate( date.day, date.month, date.year, '-' )
    this.editTaskSubscription = this.taskService.putEditTaskById( taskId, task )
      .subscribe( data => {
        this.loadPageGoals();
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

  private changeStatus( itemInfo: any ) {
    const item = {
      id: itemInfo.itemId,
      status: itemInfo.status === 0 ? 1 : 0
    }
    const itemElId = itemInfo.itemType + itemInfo.itemId;
    if ( itemInfo.itemType === 'goal' ) {
      this.editGoalSubscription = this.goalService.putEditGoalById( itemInfo.itemId, item )
        .subscribe( data => {
          this.loadPageGoals();
        } );
    } else if ( itemInfo.itemType === 'action' ) {
      this.editTaskSubscription = this.taskService.putEditTaskById( itemInfo.itemId, item )
        .subscribe( data => {
          this.loadPageGoals();
        } );
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
    if ( this.modalCreateSubscription ) {
      this.modalCreateSubscription.unsubscribe()
    }
    if ( this.modalDeleteSubscription ) {
      this.modalDeleteSubscription.unsubscribe();
    }
    if ( this.modalStatusSubscription ) {
      this.modalStatusSubscription.unsubscribe()
    }
  }
}
