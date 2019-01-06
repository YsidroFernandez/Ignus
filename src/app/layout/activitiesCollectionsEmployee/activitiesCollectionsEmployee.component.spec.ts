import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesCollectionsEmployeeComponent } from './activitiesCollectionsEmployee.component';

describe('ActivitiesCollectionsEmployeeComponent', () => {
  let component: ActivitiesCollectionsEmployeeComponent;
  let fixture: ComponentFixture<ActivitiesCollectionsEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesCollectionsEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesCollectionsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
