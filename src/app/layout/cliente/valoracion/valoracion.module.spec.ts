import { ValoracionModule } from './valoracion.module';

describe('ValoracionModule', () => {
  let valoracionModule: ValoracionModule;

  beforeEach(() => {
    valoracionModule = new ValoracionModule();
  });

  it('should create an instance', () => {
    expect(valoracionModule).toBeTruthy();
  });
});
