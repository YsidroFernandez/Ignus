import { ListransactionsModule } from './listransactions.module';

describe('ListransactionsModule', () => {
  let listsugerenciasModule: ListransactionsModule;

  beforeEach(() => {
    listsugerenciasModule = new ListransactionsModule();
  });

  it('should create an instance', () => {
    expect(ListransactionsModule).toBeTruthy();
  });
});
