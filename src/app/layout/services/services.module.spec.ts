import { ServicesModule } from './services.module';

describe('PerfilModule', () => {
  let serviceModule: ServicesModule;

  beforeEach(() => {
    serviceModule = new ServicesModule();
  });

  it('should create an instance', () => {
    expect(serviceModule).toBeTruthy();
  });
});
