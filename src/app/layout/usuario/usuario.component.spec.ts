import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { UsuarioComponent } from './usuario.component'
import { UsuarioModule } from './usuario.module'

describe('UsuarioComponent', () => {
  let component: UsuarioComponent
  let fixture: ComponentFixture<UsuarioComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          UsuarioModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
