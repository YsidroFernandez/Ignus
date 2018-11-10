import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AgencyComponent } from './agency.component'
import { AgencyModule } from './agency.module'

describe('AgencyComponent', () => {
  let component: AgencyComponent
  let fixture: ComponentFixture<AgencyComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AgencyModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  ) 

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})





// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AgencyComponent } from './agency.component';

// describe('AgencyComponent', () => {
//   let component: AgencyComponent;
//   let fixture: ComponentFixture<AgencyComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AgencyComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AgencyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
