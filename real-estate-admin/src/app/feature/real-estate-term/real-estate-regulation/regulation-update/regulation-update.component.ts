import { MessageService } from 'primeng/api';
import { AuthService } from './../../../../auth/service/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RealEstateTermService } from './../../service/real-estate-term.service';
import { Component, OnInit } from '@angular/core';

import { quillConfig } from 'src/app/core/const/quill-config';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeTerm } from '../../model/TypeTerm';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-regulation-update',
  templateUrl: './regulation-update.component.html',
  styleUrls: ['./regulation-update.component.scss']
})
export class RegulationUpdateComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    typeTermId: new FormControl('', Validators.required),

  });
  data = [];
  title='';
  decDialog=''
  titlebtn: any = '';
  IsDel=false;
  quillConfig = quillConfig;
  Id = '';
  IsShow = false;
  constructor(
    private sevice: RealEstateTermService,
    private routing: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('/real-estate-term/regulationCreate')) {
      this.titlebtn = 'Thêm mới';
      this.router.navigate(['/real-estate-term/regulationUpdate']);
    }
    this.routing.queryParams.subscribe((params: any) => {
      if (params && params.id) {
        this.titlebtn = 'Lưu thay đổi';
        this.title='LƯU THAY ĐỔI ?';
        this.decDialog='Bạn có muốn lưu thay đổi vừa thực hiện không?'
        this.Id = params.id;
        this.sevice.DetailTerm(this.Id).subscribe((v: any) => {
          this.form.patchValue({
            id: this.Id,
            title: v.title,
            description: v.description,
            typeTermId: v.typeTermId
          })

        });
      }
      else {
        this.router.navigate(['/real-estate-term/regulationUpdate']);
        this.titlebtn="Thêm mới";
        this.title="THÊM MỚI";
        this.decDialog="Bạn có muốn thêm mới";
      }
    });
    this.getAllTypeTerm();
  }
  getDetail(Id: any) {
    this.sevice.DetailTerm(Id).subscribe((res: any) => { res = res; });
  }
  getAllTypeTerm() {
    this.sevice.getTypeTerm().subscribe((res: any) => { this.data = res; })
  }
  update(body: any) {
    this.sevice.UpdateTerm(body).subscribe(rq => {
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });
      this.Show(2);
      this.navi(2);
    }, (v: any) => {
      this.messageService.add({ severity: 'error', detail: 'Thất bại' });
      this.navi(2);
    })
  }
  Add(body:any){
  this.sevice.AddDetailTerm(body).subscribe(data=>{
  this.messageService.add({severity:'success',detail :'Thao tác thành công'})
  this.Show(2);
  this.router.navigate(['/real-estate-term/regulationCreate'])
  },(v:any)=>{
    this.messageService.add({ severity: 'error', detail: 'Thất bại' })
  })
  }
  
  navi(type: number) {
    if (type === 1) {
      this.router.navigate(['/real-estate-term/regulationUpdate'], { queryParams: { id: this.Id } });
    }
    if(type==3){
      this.router.navigate(['/real-estate-term/regulationCreate']);
    }
    else {
      if(this.titlebtn==='Thêm mới'){
        this.router.navigate(['/real-estate-term/regulationCreate']);
      }
      else{

        this.router.navigate(['/real-estate-term/regulation'], { queryParams: { id: this.Id } });
      }
    }
  }
  ShowDelete(){
  this.IsDel=true
  this.title="Xóa";
  this.decDialog="Bạn có muốn xóa ";
 
  }
  Delete(id:any){

    const body={
      listId: [id]
    
    }
  this.sevice.Delete(body).subscribe((res:any)=>{
    this.Show(2);
    this.router.navigate(['/real-estate-term/regulationCreate']);
    this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });
    
  
  },(v:any)=>{
    this.messageService.add({ severity: 'error', detail: 'Thất bại' })}
    );
  }
  Show(type: number) {
    if (type === 1) {
      this.IsShow = true;
    }
    else {

      this.IsShow = false;
    }
  }
}
