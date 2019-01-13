import { SpecificationModule } from './specification.module';

describe('SpecificationModule', () => {
  let specificationModule: SpecificationModule;

  beforeEach(() => {
    specificationModule = new SpecificationModule();
  });

  it('should create an instance', () => {
    expect(specificationModule).toBeTruthy();
  });
});
