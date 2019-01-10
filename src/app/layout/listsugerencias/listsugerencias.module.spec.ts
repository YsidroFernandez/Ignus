import { ListSugerenciasModule } from './listsugerencias.module';

describe('ListSugerenciasModule', () => {
  let listsugerenciasModule: ListSugerenciasModule;

  beforeEach(() => {
    listsugerenciasModule = new ListSugerenciasModule();
  });

  it('should create an instance', () => {
    expect(ListSugerenciasModule).toBeTruthy();
  });
});
