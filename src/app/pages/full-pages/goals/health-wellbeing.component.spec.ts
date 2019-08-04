import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthWellbeingComponent } from './health-wellbeing.component';

describe('HealthWellbeingComponent', () => {
  let component: HealthWellbeingComponent;
  let fixture: ComponentFixture<HealthWellbeingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthWellbeingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthWellbeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
