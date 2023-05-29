import {Component, OnInit, ViewChild} from '@angular/core';
import {NewsItem} from "../model/new-item";
import {Table} from "primeng/table";

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.scss']
})
export class PostDataComponent implements OnInit {
  data: NewsItem[] = [];
  dataSelection: [] = [];
  checkBoxHeader = false;


  constructor() {
  }

  ngOnInit(): void {
    this.data = [
      {
        id: "1",
        code: "N1",
        title: "Bài viết số 1",
        author: "Tác giả 1",
        status: "Đã xuất bản",
        createDate: "2023-05-01",
        lastUpdate: "2023-05-10",
      },
      {
        id: "2",
        code: "N2",
        title: "Bài viết số 2",
        author: "Tác giả 2",
        status: "Chưa xuất bản",
        createDate: "2023-05-02",
        lastUpdate: "2023-05-09",
      },
      {
        id: "3",
        code: "N3",
        title: "Bài viết số 3",
        author: "Tác giả 3",
        status: "Đã xuất bản",
        createDate: "2023-05-03",
        lastUpdate: "2023-05-08",
      },
      {
        id: "4",
        code: "N4",
        title: "Bài viết số 4",
        author: "Tác giả 4",
        status: "Chưa xuất bản",
        createDate: "2023-05-04",
        lastUpdate: "2023-05-07",
      },
      {
        id: "5",
        code: "N5",
        title: "Bài viết số 5",
        author: "Tác giả 5",
        status: "Đã xuất bản",
        createDate: "2023-05-05",
        lastUpdate: "2023-05-06",
      },
      {
        id: "6",
        code: "N6",
        title: "Bài viết số 6",
        author: "Tác giả 6",
        status: "Chưa xuất bản",
        createDate: "2023-05-06",
        lastUpdate: "2023-05-05",
      },
      {
        id: "7",
        code: "N7",
        title: "Bài viết số 7",
        author: "Tác giả 7",
        status: "Đã xuất bản",
        createDate: "2023-05-07",
        lastUpdate: "2023-05-04",
      },
      {
        id: "8",
        code: "N8",
        title: "Bài viết số 8",
        author: "Tác giả 8",
        status: "Chưa xuất bản",
        createDate: "2023-05-08",
        lastUpdate: "2023-05-03",
      },
      {
        id: "9",
        code: "N9",
        title: "Bài viết số 9",
        author: "Tác giả 9",
        status: "Đã xuất bản",
        createDate: "2023-05-09",
        lastUpdate: "2023-05-02",
      },
      {
        id: "10",
        code: "N10",
        title: "Bài viết số 10",
        author: "Tác giả 10",
        status: "Chưa xuất bản",
        createDate: "2023-05-10",
        lastUpdate: "2023-05-01",
      },
    ];

  }
  headerCheckboxChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const checked = target.checked;
  console.log(checked); // Giá trị của checkBoxHeader
}

}
