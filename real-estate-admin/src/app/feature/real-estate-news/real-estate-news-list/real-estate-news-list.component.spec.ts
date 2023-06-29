import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateNewsListComponent } from './real-estate-news-list.component';

describe('RealEstateNewsListComponent', () => {
  let component: RealEstateNewsListComponent;
  let fixture: ComponentFixture<RealEstateNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateNewsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
