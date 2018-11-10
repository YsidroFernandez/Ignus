import { PerfilModule } from './perfil.module';

describe('PerfilModule', () => {
  let perfilModule: PerfilModule;

  beforeEach(() => {
    perfilModule = new PerfilModule();
  });

  it('should create an instance', () => {
    expect(perfilModule).toBeTruthy();
  });
});
