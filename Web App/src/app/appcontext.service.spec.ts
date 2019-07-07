import { TestBed } from '@angular/core/testing';

import { AppcontextService } from './appcontext.service';

describe('AppcontextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppcontextService = TestBed.get(AppcontextService);
    expect(service).toBeTruthy();
  });
});
