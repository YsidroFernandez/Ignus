import { ActividadModule } from './actividad.module';

describe('ActividadModule', () => {
  let actividadModule: ActividadModule;

  beforeEach(() => {
    actividadModule = new ActividadModule();
  });

  it('should create an instance', () => {
    expect(actividadModule).toBeTruthy();
  });
});
