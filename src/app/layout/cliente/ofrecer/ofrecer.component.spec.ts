import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfrecerComponent } from './ofrecer.component';

describe('OfrecerComponent', () => {
  let component: OfrecerComponent;
  let fixture: ComponentFixture<OfrecerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfrecerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfrecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
