import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs";
import {MessageService} from "primeng/api";
import {MediaService} from "../../../core/service/media.service";

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
  params: any;
  listFileUpload: any;

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private messageService: MessageService,
    private mediaService: MediaService) {
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

  getFile(evt: any) {
    this.listFileUpload = evt;
  }

  clearFile(evt: any) {
    this.detailData.image = evt;
  }

  doUpdate() {
    let arrImg: any[] = [];
    if (this.listFileUpload) {
      this.mediaService.uploadFile(this.listFileUpload).subscribe(res => {
        for (let i of this.detailData.image) {
          if (typeof i === "string") {
            arrImg.push(i)
          }
        }
        for (let i of res) {
          arrImg.push(i)
        }
        console.log(arrImg)
        const body = {
          ...this.updateForm.value, image: arrImg
        }
        this.update(body);
      })
    } else {
      const body = {
        ...this.updateForm.value, image: this.detailData.image
      }
      this.update(body)
    }
  }

  update(body: any) {
    this.postService.update(body, this.isBuy).subscribe(res => {
      this.messageService.add({severity: 'success', detail: 'Thao tác thành công'});
      this.router.navigate(['news', 'view'], {queryParams: this.params})
    })
  }
}
