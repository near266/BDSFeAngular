import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputUploadComponent } from './image-input-upload.component';

describe('ImageInputUploadComponent', () => {
  let component: ImageInputUploadComponent;
  let fixture: ComponentFixture<ImageInputUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageInputUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageInputUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
