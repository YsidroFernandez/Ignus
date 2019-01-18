import { PublicationsModule } from './publications.module';

describe('PerfilModule', () => {
  let publicationsModule: PublicationsModule;

  beforeEach(() => {
    publicationsModule = new PublicationsModule();
  });

  it('should create an instance', () => {
    expect(publicationsModule).toBeTruthy();
  });
});
