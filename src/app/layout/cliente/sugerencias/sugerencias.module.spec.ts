import { SugerenciasModule } from './sugerencias.module';

describe('SugerenciasModule', () => {
  let sugerenciasModule: SugerenciasModule;

  beforeEach(() => {
    sugerenciasModule = new SugerenciasModule();
  });

  it('should create an instance', () => {
    expect(sugerenciasModule).toBeTruthy();
  });
});
