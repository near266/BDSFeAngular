import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPackListComponent } from './config-pack-list.component';

describe('ConfigPackListComponent', () => {
  let component: ConfigPackListComponent;
  let fixture: ComponentFixture<ConfigPackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPackListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
