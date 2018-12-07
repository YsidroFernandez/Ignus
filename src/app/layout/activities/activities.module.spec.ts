import { ActivitiesModule } from './activities.module';

describe('PerfilModule', () => {
  let activitiesModule: ActivitiesModule;

  beforeEach(() => {
    activitiesModule = new ActivitiesModule();
  });

  it('should create an instance', () => {
    expect(activitiesModule).toBeTruthy();
  });
});
