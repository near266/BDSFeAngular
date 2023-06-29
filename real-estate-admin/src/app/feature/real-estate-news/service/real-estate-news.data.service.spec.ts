import { TestBed } from '@angular/core/testing';

import { RealEstateNews.DataService } from './real-estate-news.data.service';

describe('RealEstateNews.DataService', () => {
  let service: RealEstateNews.DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealEstateNews.DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
