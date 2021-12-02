import { TestBed } from '@angular/core/testing';

import { DatosSessionService } from './datos-session.service';

describe('DatosSessionService', () => {
  let service: DatosSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
