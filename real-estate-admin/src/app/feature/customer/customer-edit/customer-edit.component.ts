import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetail, PramsEdit } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { deleteModal, unBanModal } from '../model/modal';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  public imageUrl: string[] = [] || undefined;
  public fileToUpload: File | null = null;
  public CustomerId: string;
  public data: CustomerDetail;
  public isLoading: boolean = false;
  public params: PramsEdit = new PramsEdit();
  public form: FormGroup = this.fb.group({
    name: [null],
    phone: [null],
    email: [null],
    referalCode: [null],
    address: [null],
    company: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCustomerDetail();
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    if (!this.fileToUpload) {
      alert('Vui lòng chọn một tệp hình ảnh.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('type', 'image');
    formData.append("source", "real_estate");

    this.http
      .put<any>(environment.cdnUrl, formData)
      .pipe(
        catchError((error) => {
          console.error('Đã xảy ra lỗi khi tải lên ảnh: ', error);
          return [];
        })
      )
      .subscribe((response) => {
        this.imageUrl = response;
      });
  }

  ban(id: string) {
    const body = {
      listId: [id],
    };
    this.confirmationService.confirm({
      ...deleteModal,
      accept: () => {
        this.customerService.deleteCustomer(body).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Thao tác thành công',
          });
          this.router.navigate(['/customers/customerDetail', this.data.id]);
        });
      },
    });
  }

  unBan(id: string) {
    this.confirmationService.confirm({
      ...unBanModal,
      accept: () => {
        this.customerService.unBanCustomer(id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Thao tác thành công',
          });
          this.router.navigate(['/customers/customerDetail', this.data.id]);
        });
      },
    });
  }

  getCustomerDetail() {
    this.route.paramMap.subscribe((params) => {
      this.CustomerId = params.get('id') ?? '';
      if (this.CustomerId != '') {
        this.isLoading = true;
        this.customerService
          .getCustomerDetail(this.CustomerId)
          .subscribe((data) => {
            if (!data) return;
            this.data = data;
            this.form.patchValue({
              name: data.customerName,
              referalCode: data.referalCode,
              phone: data.phoneNumber,
              email: data.email,
              address: data.address,
              company: data.company,
            });
            this.isLoading = false;
            this.cdr.detectChanges();
          });
      }
    });
  }

  saveEdit() {
    this.params.id = this.data.id;
    this.params.customerName = this.form.get('name')?.value;
    this.params.phoneNumber = this.form.get('phone')?.value;
    this.params.referalCode = this.form.get('referalCode')?.value;
    this.params.email = this.form.get('email')?.value;
    this.params.address = this.form.get('address')?.value;
    this.params.company = this.form.get('company')?.value;
    this.params.avatar = this.imageUrl[0];
    this.updateCustomer();
  }

  updateCustomer() {
    this.isLoading = true;
    this.customerService.updateCustomerDetail(this.params).subscribe((data) => {
      if (!data) return;
      this.isLoading = false;
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Thao tác thành công',
      });
      this.cdr.detectChanges();
      this.router.navigate(['/customers/customerDetail', this.data.id]);
    });
  }

  backToDetail(): void {
    this.route.paramMap.subscribe((params) => {
      this.CustomerId = params.get('id') ?? '';
      this.router.navigate(['/customers/customerDetail', this.CustomerId]);
    });
  }
}
