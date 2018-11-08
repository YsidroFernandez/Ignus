import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RoleComponent } from './role.component'
import { RoleModule } from './role.module'

describe('RoleComponent', () => {
  let component: RoleComponent
  let fixture: ComponentFixture<RoleComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RoleModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})





// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { RoleComponent } from './role.component';

// describe('RoleComponent', () => {
//   let component: RoleComponent;
//   let fixture: ComponentFixture<RoleComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ RoleComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RoleComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
