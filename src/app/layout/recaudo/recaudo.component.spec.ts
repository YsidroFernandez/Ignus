import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaudoComponent } from './recaudo.component';

describe('RecaudoComponent', () => {
  let component: RecaudoComponent;
  let fixture: ComponentFixture<RecaudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecaudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
