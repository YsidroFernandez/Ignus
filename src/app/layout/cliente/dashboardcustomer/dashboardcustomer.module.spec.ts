import { DashboardcustomerModule } from './dashboardcustomer.module';

describe('DashboardcustomerModule', () => {
  let dashboardcustomerModule: DashboardcustomerModule;

  beforeEach(() => {
    dashboardcustomerModule = new DashboardcustomerModule();
  });

  it('should create an instance', () => {
    expect(dashboardcustomerModule).toBeTruthy();
  });
});
