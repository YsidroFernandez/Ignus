import { SolicitudModule } from './solicitud.module';

describe('SolicitudModule', () => {
    let solicitudModule: SolicitudModule;

    beforeEach(() => {
        solicitudModule = new SolicitudModule();
    });

    it('should create an instance', () => {
        expect(solicitudModule).toBeTruthy();
    });
});
