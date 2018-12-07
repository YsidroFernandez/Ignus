import { ClientModule } from './client.module';

describe('UsuarioModule', () => {
    let usuarioModule: ClientModule;

    beforeEach(() => {
        usuarioModule = new ClientModule();
    });

    it('should create an instance', () => {
        expect(usuarioModule).toBeTruthy();
    });
});
