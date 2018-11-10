import { SolicitudServicioModule } from './solicitud-servicio.module';

describe('SolicitudServicioModule', () => {
  let solicitudServicioModule: SolicitudServicioModule;

  beforeEach(() => {
    solicitudServicioModule = new SolicitudServicioModule();
  });

  it('should create an instance', () => {
    expect(solicitudServicioModule).toBeTruthy();
  });
});
