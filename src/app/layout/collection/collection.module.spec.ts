import { CollectionModule } from './collection.module';

describe('PerfilModule', () => {
  let recaudoModule: CollectionModule;

  beforeEach(() => {
    recaudoModule = new CollectionModule();
  });

  it('should create an instance', () => {
    expect(recaudoModule).toBeTruthy();
  });
});
