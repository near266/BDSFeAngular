import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetail } from '../model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public CustomerId: string;
  public data: CustomerDetail;
  public isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCustomerDetail();
  }

  getCustomerDetail() {
    this.route.paramMap.subscribe((params) => {
      this.CustomerId = params.get('id') ?? '';
      if (this.CustomerId != '') {
        this.isLoading = true;
        this.customerService.getCustomerDetail(this.CustomerId).subscribe((data) => {
          if (!data) return;
          this.data = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  editCustomer(): void {
    this.route.paramMap.subscribe((params) => {
      this.CustomerId = params.get('id') ?? '';
      this.router.navigate(['/customers/customerEdit', this.CustomerId]);
    });
  }
}
