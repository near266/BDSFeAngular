import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationUpdateComponent } from './regulation-update.component';

describe('RegulationUpdateComponent', () => {
  let component: RegulationUpdateComponent;
  let fixture: ComponentFixture<RegulationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulationUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
