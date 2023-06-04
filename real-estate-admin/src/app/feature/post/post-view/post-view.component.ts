import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {PostService} from "../service/post.service";

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  reasonContent = 'Cần bán gấp nhà mặt phố Châu Long, Ba Đình, DT 70m2, 8 tầng, lô góc, mặt tiền rộng 5,5 m, 32 tỷ';
  description = `Tôi cần bán gấp nhà mặt phố Châu Long, Ba Đình, DT 70m², 8 tầng, lô góc, mặt tiền rộng 5,5 m. Phù hợp vừa ở kinh doanh, dòng tiền 100 triệu/tháng.
Vị trí hiếm nhà bán, gần phố Nguyễn Trường Tộ, Quan Thánh. Giá bán 32 tỷ. Sổ đỏ, chính chủ, liên hệ Ngọc Hải (Không tiếp MG, trung gian).

Phố Châu Long, Phường Trúc Bạch, Ba Đình, Hà Nội`;
  detailData: any;

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.postService.getDetail(params.id, params.isBuy === 'true').subscribe(res => {
        this.detailData = res;
      })
    });
  }

  update() {
    this.router.navigate(['news', 'edit']);
  }
}
