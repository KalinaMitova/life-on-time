import { Component, OnInit, OnDestroy, ViewChild, SimpleChange } from '@angular/core';
import { forkJoin, Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { minStatisticData } from '../../../../shared/data/minStatisticFirstRowData';
import { GoalService } from "../../../../shared/services/goal.service";
import { TaskService } from "../../../../shared/services/task.service";
import { IdeaService } from 'app/shared/services/idea.service';

import { UserService } from 'app/shared/services/user.service';
import { BarChartData } from 'app/shared/models/barChartData';
import { BlogPost } from 'app/shared/models/blogPost';
import { BlogService } from 'app/shared/services/blog.service';


@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit {

  registrationDate: string;
  donutCharts$: Observable<Array<any>>;
  barChart$: Observable<BarChartData>;
  minStaticsDataFirstRow = minStatisticData.firstRow;
  minStaticsDataSecondRow = minStatisticData.secondRow;
  blogPosts: Array<BlogPost>;
  private minStatSubscription: Subscription;
  private regDateSubscripton: Subscription;
  private PostsSubscripton: Subscription;
  singlePostSub: Subscription;

  constructor (
    private taskService: TaskService,
    private goalService: GoalService,
    private ideasService: IdeaService,
    private userServise: UserService,
    private blogService: BlogService,
  ) {

  }

  ngOnInit() {
    this.userServise.getUserRegistrationDate()
      .subscribe( date => this.registrationDate = date );
    this.minStatSubscription = forkJoin(
      //first row
      this.goalService.getUserGoals().pipe( catchError( error => of( error ) ) ),
      this.taskService.getUserAllTasksAsNumber().pipe( catchError( error => of( error ) ) ),
      this.ideasService.getUserIdeasAsNumber().pipe( catchError( error => of( error ) ) ),
      this.taskService.getDaysToCompleteTasks().pipe( catchError( error => of( error ) ) ),
      //second row
      this.goalService.getUserCompletedGoals().pipe( catchError( error => of( error ) ) ),
      this.taskService.getUserCompletedTasks().pipe( catchError( error => of( error ) ) ),
      this.goalService.getUserGoalsFromIdeas().pipe( catchError( error => of( error ) ) ),
      this.goalService.getUserRate().pipe( catchError( error => of( error ) ) ),
    )
      .subscribe( ( [ goals, tasks, ideas, daysTocompleteTasks,
        completedGoals, completedTasks, ideasToGoals, rate
      ] ) => {
        this.minStaticsDataFirstRow[ 0 ].value = goals;
        this.minStaticsDataFirstRow[ 0 ].registrationDate = this.registrationDate;
        this.minStaticsDataFirstRow[ 1 ].value = tasks;
        this.minStaticsDataFirstRow[ 1 ].registrationDate = this.registrationDate;
        this.minStaticsDataFirstRow[ 2 ].value = ideas;
        this.minStaticsDataFirstRow[ 2 ].registrationDate = this.registrationDate;
        this.minStaticsDataFirstRow[ 3 ].value = daysTocompleteTasks;
        this.minStaticsDataSecondRow[ 0 ].value = completedGoals;
        this.minStaticsDataSecondRow[ 1 ].value = completedTasks;
        this.minStaticsDataSecondRow[ 2 ].value = ideasToGoals;
        this.minStaticsDataSecondRow[ 3 ].value = rate + ' %';
      } );

    this.donutCharts$ = this.goalService.getUserLastThreeGoalsStatistic();
    this.barChart$ = this.goalService.getUserGoalsAndTasksByCategoryAsNumber();
    this.PostsSubscripton = this.blogService.getLats4Posts()
      .subscribe( posts => {
        for ( const post of posts ) {
          this.singlePostSub = this.blogService.getPostImage( post.mediaId ).subscribe( imageUrl => {
            post.image = imageUrl;
          } )
        }
        this.blogPosts = posts;
      } );

  }

  ngOnDestroy() {
    if ( this.minStatSubscription ) {
      this.minStatSubscription.unsubscribe();
    }
    if ( this.regDateSubscripton ) {
      this.regDateSubscripton.unsubscribe();
    }
    if ( this.PostsSubscripton ) {
      this.PostsSubscripton.unsubscribe();
    }
    if ( this.singlePostSub ) {
      this, this.singlePostSub.unsubscribe();
    }
  }
}
