import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-pack-list',
  templateUrl: './config-pack-list.component.html',
  styleUrls: ['./config-pack-list.component.scss']
})
export class ConfigPackListComponent implements OnInit {

  @Input() config:any
  @Input() index:any

  constructor() { }

  ngOnInit(): void {
    console.log(this.config)
  }

}
