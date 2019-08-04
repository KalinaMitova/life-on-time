import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-health-wellbeing',
  templateUrl: './health-wellbeing.component.html',
  styleUrls: [ './health-wellbeing.component.scss' ]
} )
export class HealthWellbeingComponent implements OnInit {

  private title: string;
  private path: string
  closeResult: string;

  constructor (
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig.path;
    switch ( this.path ) {
      case 'health-wellbeing':
        {
          this.title = 'Health and Wellbeing';
        } break;
      case 'personal-development':
        {
          this.title = 'Personal Development';
        } break;
      case 'physical-activity':
        {
          this.title = 'Physical Activity';
        } break;
      case 'relationships':
        {
          this.title = 'Relationships';
        } break;
      case 'financial':
        {
          this.title = 'Financial';
        } break;
    }
  }

  open( content ) {
    this.modalService.open( content, { size: 'lg' } ).result.then( ( result ) => {
      this.closeResult = `Closed with: ${result}`;
    }, ( reason ) => {
      this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
    } );
  }

  private getDismissReason( reason: any ): string {
    if ( reason === ModalDismissReasons.ESC ) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
