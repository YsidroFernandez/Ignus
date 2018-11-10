import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { TransactionsComponent } from './transactions.component';
import { TransactionsModule } from './transaction.module';

describe('AgencyComponent', () => {
  let component: TransactionsComponent
  let fixture: ComponentFixture<TransactionsComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          TransactionsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents()
    })
  ) 

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})