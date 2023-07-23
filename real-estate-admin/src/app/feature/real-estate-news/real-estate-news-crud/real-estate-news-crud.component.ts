import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { quillConfig } from 'src/app/core/const/quill-config';

import { MessageService } from 'primeng/api';

import { RealEstateNewsService } from '../service/real-estate-news.service';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-real-estate-news-crud',
  templateUrl: './real-estate-news-crud.component.html',
  styleUrls: ['./real-estate-news-crud.component.scss'],
})
export class RealEstateNewsCrudComponent implements OnInit {
  public imageUrl: any[] = [];
  public fileToUpload: File | null = null;
  public form: FormGroup = this.fb.group({
    id: [null],
    title: [null],
    descriptionForList: [null],
    description: [null],
    imgDetail: [null],
  });

  constructor(
    private router: Router,
    private queryParam: ActivatedRoute,
    private NewPostService: RealEstateNewsService,
    private messageService: MessageService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  quillConfig = quillConfig;

  title: any = '';

  ngOnInit(): void {
    if (this.router.url.includes('/real-estate-new/create')) {
      this.title = 'THÊM TIN TỨC MỚI';
    } else {
      this.queryParam.queryParams.subscribe((data: any) => {
        this.NewPostService.getDetailPostNew(data.id).subscribe((v: any) => {
          this.form.patchValue({
            id: v.id,
            title: v.title,
            descriptionForList: v.descriptionForList,
            imgDetail: v.image,
            description: v.description,
          });
        });
      });
      if (this.router.url.includes('/real-estate-new/view')) {
        this.title = 'CHI TIẾT TIN TỨC';
        this.form.disable();
      }
      if (this.router.url.includes('/real-estate-new/edit')) {
        this.title = 'CHỈNH SỬA TIN TỨC';
      }
    }
  }

  add() {
    var newsInfo = {
      title: this.form.get('title')?.value,
      descriptionForList: this.form.get('descriptionForList')?.value,
      description: this.form.get('description')?.value,
      image: this.imageUrl[0],
    };
    this.NewPostService.addPostNew(newsInfo).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Thao tác thành công ',
        });
        this.router.navigate(['/real-estate-new']);
      },
      (v: any) => {
        this.messageService.add({ severity: 'error', detail: 'Thất bại' });
      }
    );
  }

  update() {
    var newsInfo = {
      id: this.form.get('id')?.value,
      title: this.form.get('title')?.value,
      descriptionForList: this.form.get('descriptionForList')?.value,
      description: this.form.get('description')?.value,
      image: this.imageUrl[0],
    };
    this.NewPostService.updatePostNew(newsInfo).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Thao tác thành công ',
        });
        this.router.navigate(['/real-estate-new']);
      },
      (v: any) => {
        this.messageService.add({ severity: 'error', detail: 'Thất bại' });
      }
    );
  }

  edit(id: any) {
    this.router.navigate(['/real-estate-new/edit'], {
      queryParams: { id: id },
    });
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    if (!this.fileToUpload) {
      alert('Vui lòng chọn một tệp hình ảnh.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('type', 'image');
    formData.append("source", "real_estate");

    this.http
      .put<any>(environment.cdnUrl, formData)
      .pipe(
        catchError((error) => {
          console.error('Đã xảy ra lỗi khi tải lên ảnh: ', error);
          return [];
        })
      )
      .subscribe((response) => {
        this.imageUrl = response;
      });
  }
}
