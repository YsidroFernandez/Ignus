import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ClientComponent } from './client.component'
import { ClientModule } from './client.module'

describe('ClientComponent', () => {
  let component: ClientComponent
  let fixture: ComponentFixture<ClientComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ClientModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
