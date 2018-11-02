import { AgencyModule } from './agency.module';

describe('AgencyModule', () => {
  let agencyModule: AgencyModule;

  beforeEach(() => {
    agencyModule = new AgencyModule();
  });

  it('should create an instance', () => {
    expect(agencyModule).toBeTruthy();
  });
});
