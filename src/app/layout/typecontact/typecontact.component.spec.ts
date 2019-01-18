import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContactComponent } from './typecontact.component';

describe('TypeContactComponent', () => {
  let component: TypeContactComponent;
  let fixture: ComponentFixture<TypeContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
