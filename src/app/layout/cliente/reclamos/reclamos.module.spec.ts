import { ReclamosModule } from './reclamos.module';

describe('ReclamosModule', () => {
  let reclamosModule: ReclamosModule;

  beforeEach(() => {
    reclamosModule = new ReclamosModule();
  });

  it('should create an instance', () => {
    expect(reclamosModule).toBeTruthy();
  });
});
