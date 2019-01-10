import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSugerenciasComponent } from './listsugerencias.component';

describe('IncidenciasComponent', () => {
  let component: ListSugerenciasComponent;
  let fixture: ComponentFixture<ListSugerenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSugerenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
