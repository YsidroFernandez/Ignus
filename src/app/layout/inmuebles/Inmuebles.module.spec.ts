import { InmueblesModule } from './inmuebles.module';

describe('InmueblesModule', () => {
    let InmueblesModule: InmueblesModule;

    beforeEach(() => {
        InmueblesModule = new InmueblesModule();
    });

    it('should create an instance', () => {
        expect(InmueblesModule).toBeTruthy();
    });
});
