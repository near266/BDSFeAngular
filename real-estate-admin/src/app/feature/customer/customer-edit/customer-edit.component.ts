import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetail, PramsEdit } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCustomerDetail();
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
