import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vnCurrency'
})
export class VnCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    // Kiểm tra nếu giá trị không phải là số
    if (isNaN(value)) {
      return '';
    }
    if (!value) {
      return '0 VNĐ';
    }

    // Chuyển đổi giá trị số thành chuỗi\
    const stringValue = value.toString() || '';

    // Thêm dấu phân cách hàng nghìn
    const parts = stringValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Kết hợp lại và thêm đơn vị tiền tệ (VND)
    const formattedValue = parts.join('.');
    return formattedValue + ' VNĐ';
  }
}
