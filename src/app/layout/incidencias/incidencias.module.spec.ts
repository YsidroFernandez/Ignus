import { IncidenciasModule } from './incidencias.module';

describe('IncidenciasModule', () => {
  let incidenciasModule: IncidenciasModule;

  beforeEach(() => {
    incidenciasModule = new IncidenciasModule();
  });

  it('should create an instance', () => {
    expect(incidenciasModule).toBeTruthy();
  });
});
