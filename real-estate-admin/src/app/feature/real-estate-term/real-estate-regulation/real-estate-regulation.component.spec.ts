import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateRegulationComponent } from './real-estate-regulation.component';

describe('RealEstateRegulationComponent', () => {
  let component: RealEstateRegulationComponent;
  let fixture: ComponentFixture<RealEstateRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateRegulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
