import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isBuy: boolean;
  detailData: any;
  updateForm: FormGroup;
  listStatus: any[];
  params: any
  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private messageService: MessageService) {
    this.initForm();
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      this.isBuy = params.isBuy === 'true';
      this.getSData(params);
      this.params = params;
    });
  }

  getSData(params: any) {
    forkJoin([this.translateService.get('listStatus'), this.postService.getDetail(params.id, params.isBuy === 'true')]).subscribe(
      (res: any) => {
        this.listStatus = res[0];
        this.detailData = res[1];
        this.updateForm.patchValue(this.detailData);
      }
    )
  }


  initForm() {
    this.updateForm = this.fb.group({
      id: [],
      titile: [],
      description: [],
      status: [],
    })
  }

  doUpdate() {
    const arrImg = [];
    for (let i of this.detailData.image) {
      arrImg.push(i.changingThisBreaksApplicationSecurity || i);
    }
    const body = {
      ...this.updateForm.value, image: arrImg
    }
    this.postService.update(body, this.isBuy).subscribe(res => {
      this.messageService.add({severity: 'success', detail: 'Thao tác thành công'});
      this.router.navigate(['news', 'view'], {queryParams: this.params})
    })
  }
}
