import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SolicitudComponent } from './solicitud.component'
import { SolicitudModule } from './solicitud.module'

describe('SolicitudComponent', () => {
  let component: SolicitudComponent
  let fixture: ComponentFixture<SolicitudComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          SolicitudModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
