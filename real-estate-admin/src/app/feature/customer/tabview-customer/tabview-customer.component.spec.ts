import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabviewCustomerComponent } from './tabview-customer.component';

describe('TabviewCustomerComponent', () => {
  let component: TabviewCustomerComponent;
  let fixture: ComponentFixture<TabviewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabviewCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabviewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
