import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { quillConfig } from 'src/app/core/const/quill-config';

import { MessageService } from 'primeng/api';

import { RealEstateNewsService } from '../service/real-estate-news.service';

@Component({
  selector: 'app-real-estate-news-crud',
  templateUrl: './real-estate-news-crud.component.html',
  styleUrls: ['./real-estate-news-crud.component.scss']
})
export class RealEstateNewsCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private queryParam: ActivatedRoute,
    private NewPostService: RealEstateNewsService,
    private messageService: MessageService,
  ) { }

  quillConfig = quillConfig

  form = new FormGroup({
    id: new FormControl(undefined),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  title: any = ''

  ngOnInit(): void {
    if (this.router.url.includes('/real-estate-new/create')) {
      this.title = 'THÊM TIN TỨC MỚI'
    }
    else {
      this.queryParam.queryParams.subscribe((data: any) => {
        this.NewPostService.getDetailPostNew(data.id).subscribe((v: any) => {
          this.form.patchValue({
            id: v.id,
            title: v.title,
            description: v.description
          })
        })
      })
      if (this.router.url.includes('/real-estate-new/view')) {
        this.title = 'CHI TIẾT TIN TỨC'
        this.form.disable()
      }
      if (this.router.url.includes('/real-estate-new/edit')) {
        this.title = 'CHỈNH SỬA TIN TỨC'
      }
    }
  }

  add(body: any) {
    this.NewPostService.addPostNew(body).subscribe(data => {
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
      this.router.navigate(['/real-estate-new'])
    }, (v: any) => {
      this.messageService.add({ severity: 'error', detail: 'Thất bại' })
    })
  }

  update(body: any) {
    this.NewPostService.updatePostNew(body).subscribe(data => {
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
      this.router.navigate(['/real-estate-new'])
    }, (v: any) => {
      this.messageService.add({ severity: 'error', detail: 'Thất bại' })
    })
  }

  edit(id: any) {
    this.router.navigate(['/real-estate-new/edit'], { queryParams: { id: id } })
  }

}
