import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { OfrecerComponent } from './ofrecer.component';

import { OfrecerModule } from './ofrecer.module';



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


