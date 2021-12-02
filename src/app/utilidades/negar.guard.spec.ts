import { TestBed } from '@angular/core/testing';

import { NegarGuard } from './negar.guard';

describe('NegarGuard', () => {
  let guard: NegarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NegarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
