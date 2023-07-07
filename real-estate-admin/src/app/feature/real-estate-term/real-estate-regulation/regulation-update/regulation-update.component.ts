
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RealEstateTermService } from './../../service/real-estate-term.service';
import { Component, OnInit } from '@angular/core';

import { quillConfig } from 'src/app/core/const/quill-config';

@Component({
  selector: 'app-regulation-update',
  templateUrl: './regulation-update.component.html',
  styleUrls: ['./regulation-update.component.scss']
})
export class RegulationUpdateComponent implements OnInit {
 form= new FormGroup({
  id: new FormControl(undefined),
  title: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required)});
 quillConfig = quillConfig;
  constructor(
  private sevice: RealEstateTermService,
  
  
  ) { }

  ngOnInit(): void {
  }

}
