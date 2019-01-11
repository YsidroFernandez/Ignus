import { ListIncidencesModule } from './listincidences.module';

describe('ListIncidencesModule', () => {
  let listincidencesModule: ListIncidencesModule;

  beforeEach(() => {
    listincidencesModule = new ListIncidencesModule();
  });

  it('should create an instance', () => {
    expect(ListIncidencesModule).toBeTruthy();
  });
});
