import { RealEstateTermService } from './../service/real-estate-term.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Term } from '../model/Term';
import { TableBody } from 'primeng/table';

@Component({
  selector: 'app-real-estate-regulation',
  templateUrl: './real-estate-regulation.component.html',
  styleUrls: ['./real-estate-regulation.component.scss']
})
export class RealEstateRegulationComponent implements OnInit {
  [x: string]: any;

 Id : string |'';
 termRegulation: any [] =[];
 term : Term [] =  [];
 result:Term;
  constructor(
  private router : Router,
  private routing : ActivatedRoute,
  private termService : RealEstateTermService 
  ) { }

  ngOnInit(): void {
    this.getRegualtion();
    this.routing.queryParams.subscribe((params:any)=>{
    if(params){
    this.Id=params.id;
    this.getDetail(this.Id);
    this.getId();
    }
    else{
    this.router.navigate(['/real-estate-term']);

    }
    });
    
  }
 getRegualtion(){
 this.termService.getAllTerm({}).subscribe((res:any)=> {this.term = res});
 }
 
 getDetail(Id:any){
 this.termService.DetailTerm(Id).subscribe((res:any)=>{this.result=res;});
 }
  getId():string{
  return this.Id;
 }
navi(){

this.router.navigate(['/real-estate-term/regulation'])
}

}
