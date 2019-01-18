import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SpecificationComponent } from './specification.component'
import { SpecificationModule } from './specification.module'

describe('SpecificationComponent', () => {
  let component: SpecificationComponent
  let fixture: ComponentFixture<SpecificationComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          SpecificationModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})





// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { specificationComponent } from './specification.component';

// describe('specificationComponent', () => {
//   let component: specificationComponent;
//   let fixture: ComponentFixture<specificationComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ specificationComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(specificationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
