import { TestBed, inject } from '@angular/core/testing';

import { StreamerService } from './streamer.service';

describe('StreamerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamerService]
    });
  });

  it('should be created', inject([StreamerService], (service: StreamerService) => {
    expect(service).toBeTruthy();
  }));
});
