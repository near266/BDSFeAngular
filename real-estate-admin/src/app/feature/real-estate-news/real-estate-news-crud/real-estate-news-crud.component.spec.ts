import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateNewsCrudComponent } from './real-estate-news-crud.component';

describe('RealEstateNewsCrudComponent', () => {
  let component: RealEstateNewsCrudComponent;
  let fixture: ComponentFixture<RealEstateNewsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateNewsCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateNewsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
