import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { quillConfig } from 'src/app/core/const/quill-config';

@Component({
  selector: 'app-real-estate-news-crud',
  templateUrl: './real-estate-news-crud.component.html',
  styleUrls: ['./real-estate-news-crud.component.scss']
})
export class RealEstateNewsCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private queryParam: ActivatedRoute
  ) { }

  quillConfig = quillConfig

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  title: any = ''

  ngOnInit(): void {
    if (this.router.url.includes('/real-estate-new/create')) {
      this.title = 'THÊM TIN TỨC MỚI'
    }
    if (this.router.url.includes('/real-estate-new/view')) {
      this.title = 'CHI TIẾT TIN TỨC'
    }
    if (this.router.url.includes('/real-estate-new/edit')) {
      this.title = 'CHỈNH SỬA TIN TỨC'
    }
  }

}
