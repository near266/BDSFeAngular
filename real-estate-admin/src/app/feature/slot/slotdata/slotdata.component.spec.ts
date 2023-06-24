import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotdataComponent } from './slotdata.component';

describe('SlotdataComponent', () => {
  let component: SlotdataComponent;
  let fixture: ComponentFixture<SlotdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
