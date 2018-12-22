import { SocialNetworksModule } from './socialnetworks.module';

describe('PerfilModule', () => {
  let socialnetworksModule: SocialNetworksModule;

  beforeEach(() => {
    socialnetworksModule = new SocialNetworksModule();
  });

  it('should create an instance', () => {
    expect(socialnetworksModule).toBeTruthy();
  });
});
