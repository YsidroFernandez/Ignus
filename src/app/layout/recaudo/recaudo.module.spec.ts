import { RecaudoModule } from './recaudo.module';

describe('PerfilModule', () => {
  let recaudoModule: RecaudoModule;

  beforeEach(() => {
    recaudoModule = new RecaudoModule();
  });

  it('should create an instance', () => {
    expect(recaudoModule).toBeTruthy();
  });
});
