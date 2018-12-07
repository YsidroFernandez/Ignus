import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcustomerComponent } from './dashboardcustomer.component';

describe('DashboardcustomerComponent', () => {
  let component: DashboardcustomerComponent;
  let fixture: ComponentFixture<DashboardcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
