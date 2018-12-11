import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesCollectionsComponent } from './activitiesCollections.component';

describe('ActivitiesCollectionsComponent', () => {
  let component: ActivitiesCollectionsComponent;
  let fixture: ComponentFixture<ActivitiesCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
