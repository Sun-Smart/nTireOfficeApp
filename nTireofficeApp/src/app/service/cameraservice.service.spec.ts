/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CameraserviceService } from './cameraservice.service';

describe('Service: Cameraservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraserviceService]
    });
  });

  it('should ...', inject([CameraserviceService], (service: CameraserviceService) => {
    expect(service).toBeTruthy();
  }));
});
