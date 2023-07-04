import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-pack-list',
  templateUrl: './config-pack-list.component.html',
  styleUrls: ['./config-pack-list.component.scss']
})
export class ConfigPackListComponent implements OnInit {

  @Input() config: any
  @Input() index: any
  @Output() edit: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  Edit(){
    this.edit.emit(this.config)
  }

}
