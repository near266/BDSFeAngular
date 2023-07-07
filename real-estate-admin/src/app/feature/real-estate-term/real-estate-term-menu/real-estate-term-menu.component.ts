import { Term } from './../model/Term';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealEstateTermService } from '../service/real-estate-term.service';
import { TypeTerm } from '../model/TypeTerm';

@Component({
  selector: 'app-real-estate-term-menu',
  templateUrl: './real-estate-term-menu.component.html',
  styleUrls: ['./real-estate-term-menu.component.scss']
})
export class RealEstateTermMenuComponent implements OnInit {
  [x: string]: any;
  data: TypeTerm[] = [];
  constructor(
    private router: Router,
    private queryParam: ActivatedRoute,
    private TermService: RealEstateTermService

  ) { }

  ngOnInit(): void {
    this.GetTypeTerm();
    
  }
  GetTypeTerm() {
    this.TermService.getTypeTerm().subscribe((res: any) => { this.data = res; });
  }

}
