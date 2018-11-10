import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SolicitudServicioComponent } from './solicitud-servicio.component';
import {SolicitudServicioModule} from './solicitud-servicio.module';
describe('SolicitudServicioComponent', () => {
  let component: SolicitudServicioComponent;
  let fixture: ComponentFixture<SolicitudServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SolicitudServicioModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
