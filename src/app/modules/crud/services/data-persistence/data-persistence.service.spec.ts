import { TestBed, inject } from '@angular/core/testing';

import { DataPersistenceService } from './data-persistence.service';
import { Client } from '../../models/client/client.model';

describe('DataPersistenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPersistenceService]
    });
  });

  it('should be created', inject([DataPersistenceService], (service: DataPersistenceService<Client>) => {
    expect(service).toBeTruthy();
  }));
});
