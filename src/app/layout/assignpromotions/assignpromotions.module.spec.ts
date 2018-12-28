import { AssignPromotionsModule } from './assignpromotions.module';

describe('PerfilModule', () => {
  let assignpromotionsModule: AssignPromotionsModule;

  beforeEach(() => {
    assignpromotionsModule = new AssignPromotionsModule();
  });

  it('should create an instance', () => {
    expect(assignpromotionsModule).toBeTruthy();
  });
});
