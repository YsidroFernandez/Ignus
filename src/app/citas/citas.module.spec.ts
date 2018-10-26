import { CitasModule } from './citas.module';

describe('CitasModule', () => {
  let citasModule: CitasModule;

  beforeEach(() => {
    citasModule = new CitasModule();
  });

  it('should create an instance', () => {
    expect(citasModule).toBeTruthy();
  });
});
