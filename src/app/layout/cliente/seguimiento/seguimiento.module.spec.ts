import { SeguimientoModule } from './seguimiento.module';

describe('SeguimientoModule', () => {
  let seguimientoModule: SeguimientoModule;

  beforeEach(() => {
    seguimientoModule = new SeguimientoModule();
  });

  it('should create an instance', () => {
    expect(seguimientoModule).toBeTruthy();
  });
});
