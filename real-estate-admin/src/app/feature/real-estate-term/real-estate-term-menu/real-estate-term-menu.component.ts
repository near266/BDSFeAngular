import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-real-estate-term-menu',
  templateUrl: './real-estate-term-menu.component.html',
  styleUrls: ['./real-estate-term-menu.component.scss']
})
export class RealEstateTermMenuComponent implements OnInit {

  constructor( 
  private router : Router,
  private queryParam : ActivatedRoute,
  
  
  ) { }

  ngOnInit(): void {
  }

}
