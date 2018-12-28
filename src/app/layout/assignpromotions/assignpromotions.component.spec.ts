import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPromotionsComponent } from './assignpromotions.component';

describe('AssignPromotionsComponent', () => {
  let component: AssignPromotionsComponent;
  let fixture: ComponentFixture<AssignPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
