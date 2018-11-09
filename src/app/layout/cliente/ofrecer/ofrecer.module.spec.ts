import { OfrecerModule } from './ofrecer.module';

describe('OfrecerModule', () => {
  let ofrecerModule: OfrecerModule;

  beforeEach(() => {
    ofrecerModule = new OfrecerModule();
  });

  it('should create an instance', () => {
    expect(ofrecerModule).toBeTruthy();
  });
});
