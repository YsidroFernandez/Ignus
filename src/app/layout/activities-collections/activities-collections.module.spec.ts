import { ActivitiesCollectionsModule } from './activities-collections.module';

describe('PerfilModule', () => {
  let activitiesCollectionsModule: ActivitiesCollectionsModule;

  beforeEach(() => {
    activitiesCollectionsModule = new ActivitiesCollectionsModule();
  });

  it('should create an instance', () => {
    expect(activitiesCollectionsModule).toBeTruthy();
  });
});
