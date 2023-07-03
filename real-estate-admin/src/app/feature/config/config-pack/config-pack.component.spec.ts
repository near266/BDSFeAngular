import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPackComponent } from './config-pack.component';

describe('ConfigPackComponent', () => {
  let component: ConfigPackComponent;
  let fixture: ComponentFixture<ConfigPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
