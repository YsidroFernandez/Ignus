import { RegistroSolicitudModule } from './registrosolicitud.module';

describe('RegistroSolicitudModule', () => {
    let registrosolicitudModule: RegistroSolicitudModule;

    beforeEach(() => {
        registrosolicitudModule = new RegistroSolicitudModule();
    });

    it('should create an instance', () => {
        expect(registrosolicitudModule).toBeTruthy();
    });
});
