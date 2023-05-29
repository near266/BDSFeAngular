import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTabviewComponent } from './post-tabview.component';

describe('PostTabviewComponent', () => {
  let component: PostTabviewComponent;
  let fixture: ComponentFixture<PostTabviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTabviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
