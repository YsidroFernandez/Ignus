import { ReservaModule } from './reserva.module';

describe('ReservaModule', () => {
  let reservaModule: ReservaModule;

  beforeEach(() => {
    reservaModule = new ReservaModule();
  });

  it('should create an instance', () => {
    expect(reservaModule).toBeTruthy();
  });
});
