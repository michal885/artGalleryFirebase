import { TestBed } from '@angular/core/testing';

import { PaintingResolverService } from './resolver.service';

describe('ResolverService', () => {
  let service: PaintingResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
