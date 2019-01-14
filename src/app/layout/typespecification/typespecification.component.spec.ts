import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { TypeSpecificationComponent } from './typespecification.component'
import { TypeSpecificationModule } from './typespecification.module'

describe('TypeSpecificationComponent', () => {
  let component: TypeSpecificationComponent
  let fixture: ComponentFixture<TypeSpecificationComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          TypeSpecificationModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSpecificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})





// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { TypeSpecificationComponent } from './TypeSpecification.component';

// describe('TypeSpecificationComponent', () => {
//   let component: TypeSpecificationComponent;
//   let fixture: ComponentFixture<TypeSpecificationComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ TypeSpecificationComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TypeSpecificationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
