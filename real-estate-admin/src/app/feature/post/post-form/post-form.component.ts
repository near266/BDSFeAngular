import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";

import { TranslateService } from "@ngx-translate/core";

import { forkJoin } from "rxjs";

import { ConfirmationService, MessageService } from "primeng/api";

import { confirmSaveModal, exitModal } from "../model/confirm-dialog";
import { PostService } from "../service/post.service";
import { MediaService } from "../../../core/service/media.service";

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
  listUnit: any[];
  finance: string


  constructor(
    private router: Router,
    private postService: PostService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private messageService: MessageService,
    private mediaService: MediaService,
    private currencyPipe: CurrencyPipe) {
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

    forkJoin([this.translateService.get(params.isBuy === 'true' ? 'buyListStatusUpdate' : 'saleListStatusUpdate'),
    this.postService.getDetail(params.id, params.isBuy === 'true'),
    this.translateService.get(params.isBuy === 'true' ? 'unitBoughtNews' : 'unitSaleNews')]).subscribe(
      (res: any) => {
        this.listStatus = res[0];
        if (this.isBuy == true) {
          console.log(res[0].filter((stt: any) => stt.code !== 3))
        }
        else console.log(res[0])
        this.detailData = res[1];
        this.listUnit = res[2];
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
      area: [],
      price: [],
      fullName: [],
      email: [],
      address: [],
      phoneNumber: [],
      unit: [],
      addressUser: []
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
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });
      this.router.navigate(['news', 'view'], { queryParams: this.params })
    })
  }

  back() {
    this.confirmationService.confirm({
      ...exitModal, accept: () => {
        this.router.navigate(['news'])
      }
    })
  }

  confirmUpdate() {
    this.confirmationService.confirm({
      ...confirmSaveModal, accept: () => {
        this.doUpdate()
      }
    })
  }

  convertPrice(priceFrom: number, priceTo: number): any {
    if (priceFrom < 500000000) {
      return { code: 0, label: 'Dưới 500 triệu' };
    }
    if (priceFrom >= 500000000 || priceTo <= 800000000) {
      return { code: 1, label: 'Từ 500 triệu đến 800 triệu' };
    }
    if (priceFrom >= 800000000 || priceTo <= 1000000000) {
      return { code: 2, label: 'Từ 800 triệu đến 1 tỷ' };
    }
    if (priceFrom >= 1000000000 || priceTo <= 2000000000) {
      return { code: 3, label: 'Từ 1 tỷ đến 2 tỷ' };
    }
    if (priceFrom >= 2000000000 || priceTo <= 3000000000) {
      return { code: 4, label: 'Từ 2 tỷ đến 3 tỷ' };
    }
    if (priceFrom >= 3000000000 || priceTo <= 5000000000) {
      return { code: 5, label: 'Từ 3 tỷ đến 5 tỷ' };
    }
    if (priceFrom >= 5000000000 || priceTo <= 7000000000) {
      return { code: 6, label: 'Từ 5 tỷ đến 7 tỷ' };
    }
    if (priceFrom >= 7000000000 || priceTo <= 10000000000) {
      return { code: 7, label: 'Từ 7 tỷ đến 10 tỷ' };
    }
    if (priceFrom > 10000000000) {
      return { code: 8, label: 'Trên 10 tỷ' };
    }
    return { code: 9, label: '' };
  }

  convertUnit(unit: number): string {
    if (unit > 1000000000) {
      return (unit / 1000000000).toFixed() + ' tỷ';
    }
    if (unit > 1000000 && unit < 1000000000) {
      return (unit / 1000000).toFixed() + ' triệu';
    }

    return this.currencyPipe.transform(unit, 'VND')?.replace('.', '*')?.replace(',', '.')?.replace('*', ',') + '';
  }
  changeUnit(e: any) {
    this.finance = this.listUnit[e.value].label;
  }

}
