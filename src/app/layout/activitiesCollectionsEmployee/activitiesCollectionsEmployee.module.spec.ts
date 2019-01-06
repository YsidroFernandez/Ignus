import { ActivitiesCollectionsEmployeeModule } from './activitiesCollectionsEmployee.module';

describe('PerfilModule', () => {
  let activitiesCollectionsEmployeeModule: ActivitiesCollectionsEmployeeModule;

  beforeEach(() => {
    activitiesCollectionsEmployeeModule = new ActivitiesCollectionsEmployeeModule();
  });

  it('should create an instance', () => {
    expect(activitiesCollectionsEmployeeModule).toBeTruthy();
  });
});
