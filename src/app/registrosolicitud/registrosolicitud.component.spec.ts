import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RegistroSolicitudComponent } from './registrosolicitud.component'
import { RegistroSolicitudModule } from './registrosolicitud.module'

describe('SolicitudComponent', () => {
  let component: RegistroSolicitudComponent
  let fixture: ComponentFixture<RegistroSolicitudComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RegistroSolicitudModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSolicitudComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
