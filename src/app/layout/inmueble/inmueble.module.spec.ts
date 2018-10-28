import { InmuebleModule } from './inmueble.module';

describe('InmuebleModule', () => {
  let inmuebleModule: InmuebleModule;

  beforeEach(() => {
    inmuebleModule = new InmuebleModule();
  });

  it('should create an instance', () => {
    expect(inmuebleModule).toBeTruthy();
  });
});
