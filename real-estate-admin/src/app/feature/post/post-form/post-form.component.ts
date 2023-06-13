import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isBuy: boolean;
  detailData: any;
  currentPage = 0;
  itemsPerPage = 3;
  maxPage = 0;

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.isBuy = params.isBuy === 'true';
      this.postService.getDetail(params.id, params.isBuy === 'true').subscribe(res => {
        this.detailData = res;
        this.maxPage = Math.floor((this.detailData.image.length - 1) / this.itemsPerPage);
      })
    });
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  getItems() {
    const start = this.currentPage * this.itemsPerPage;
    return this.detailData?.image.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
    }
  }

  isAtLeftEdge(): boolean {
    return this.currentPage === 0;
  }

  isAtRightEdge(): boolean {
    return this.currentPage === this.maxPage;
  }
  onFileChange(event: any){
    console.log(event.target.files)
    const files =event.target.files;
     const objUrl = window.URL.createObjectURL(files[0]);
    const previewUrl = this.sanitizer.bypassSecurityTrustUrl(objUrl);
    console.log(previewUrl)
    this.detailData?.image.push(previewUrl);
    console.log(this.detailData?.image)
  }
}
