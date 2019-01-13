import { TypeSpecificationModule } from './typespecification.module';

describe('TypeSpecificationModule', () => {
  let typeSpecificationModule: TypeSpecificationModule;

  beforeEach(() => {
    typeSpecificationModule = new TypeSpecificationModule();
  });

  it('should create an instance', () => {
    expect(typeSpecificationModule).toBeTruthy();
  });
});
