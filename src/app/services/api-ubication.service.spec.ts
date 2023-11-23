import { TestBed } from '@angular/core/testing';

import { ApiUbicationService } from './api-ubication.service';

describe('ApiUbicationService', () => {
  let service: ApiUbicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUbicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
