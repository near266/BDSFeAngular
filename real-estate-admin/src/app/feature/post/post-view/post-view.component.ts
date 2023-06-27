import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {PostService} from "../service/post.service";

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  detailData: any;
  currentPage = 0;
  isBuy: boolean;
  params: any;

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.isBuy = params.isBuy === 'true';
      this.params = params;
      this.postService.getDetail(params.id, params.isBuy === 'true').subscribe(res => {
        this.detailData = res;
        if (this.isBuy) {
          this.detailData.unit = this.convertPrice(this.detailData.priceFrom, this.detailData.priceTo);
        }
      })
    });
  }

  update() {
    this.router.navigate(['news', 'edit'], {queryParams: this.params});
  }

  convertPrice(priceFrom: number, priceTo: number): string {
    if (priceFrom < 500000000) {
      return 'Dưới 500 triệu';
    }
    if (priceFrom >= 500000000 || priceTo <= 800000000) {
      return 'Từ 500 triệu đến 800 triệu';
    }
    if (priceFrom >= 800000000 || priceTo <= 1000000000) {
      return 'Từ 800 triệu đến 1 tỷ';
    }
    if (priceFrom >= 1000000000 || priceTo <= 2000000000) {
      return 'Từ 1 tỷ đến 2 tỷ';
    }
    if (priceFrom >= 2000000000 || priceTo <= 3000000000) {
      return 'Từ 2 tỷ đến 3 tỷ';
    }
    if (priceFrom >= 3000000000 || priceTo <= 5000000000) {
      return 'Từ 3 tỷ đến 5 tỷ';
    }
    if (priceFrom >= 5000000000 || priceTo <= 7000000000) {
      return 'Từ 5 tỷ đến 7 tỷ';
    }
    if (priceFrom >= 7000000000 || priceTo <= 10000000000) {
      return 'Từ 7 tỷ đến 10 tỷ';
    }
    if (priceFrom > 10000000000) {
      return 'Trên 10 tỷ';
    }
    return '';
  }
}
