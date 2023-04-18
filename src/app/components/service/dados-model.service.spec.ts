import { TestBed } from '@angular/core/testing';

import { DadosModelService } from './dados-model.service';

describe('DadosModelService', () => {
  let service: DadosModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
