import { error } from '@angular/compiler-cli/src/transformers/util';
export enum ConfirmDialog {
}

export const approveModal = {
  key: 'errorDialog',
  header: 'Duyệt',
  message: 'Bạn xác nhận sẽ duyệt bài này',
  acceptLabel: 'Đồng ý',
  rejectLabel: 'Huỷ',
  rejectButtonStyleClass: 'p-button-outlined'
}

export const deleteModal = {
  key: 'errorDialog',
  header: 'Xoá',
  message: 'Bạn xác nhận sẽ xóa bài này',
  acceptLabel: 'Đồng ý',
  rejectLabel: 'Huỷ',
  rejectButtonStyleClass: 'p-button-outlined p-button-danger'
}
export const errorModal = {
  key: 'errorDialog',
  header: 'Lỗi',
  message: 'Vui lòng nhập đúng thông tin',
  acceptLabel: 'Đồng ý',
  rejectLabel: 'Huỷ',
  rejectButtonStyleClass: 'p-button-outlined p-button-danger'
}