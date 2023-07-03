import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateTermMenuComponent } from './real-estate-term-menu.component';

describe('RealEstateTermMenuComponent', () => {
  let component: RealEstateTermMenuComponent;
  let fixture: ComponentFixture<RealEstateTermMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateTermMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateTermMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
