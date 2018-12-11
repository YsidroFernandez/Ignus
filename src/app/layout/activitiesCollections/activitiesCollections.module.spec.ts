import { ActivitiesCollectionsModule } from './activitiesCollections.module';

describe('PerfilModule', () => {
  let activitiesCollectionsModule: ActivitiesCollectionsModule;

  beforeEach(() => {
    activitiesCollectionsModule = new ActivitiesCollectionsModule();
  });

  it('should create an instance', () => {
    expect(activitiesCollectionsModule).toBeTruthy();
  });
});
