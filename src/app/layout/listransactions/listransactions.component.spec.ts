import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListransactionsComponent } from './listransactions.component';

describe('ListransactionsComponent', () => {
  let component: ListransactionsComponent;
  let fixture: ComponentFixture<ListransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
