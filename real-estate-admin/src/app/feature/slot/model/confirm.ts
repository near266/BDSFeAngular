import { error } from '@angular/compiler-cli/src/transformers/util';
export enum confirm {
}
export const AddModal = {
    key: 'errorDialog',
    header: 'Thêm khu đất',
    message: 'Bạn có muốn thêm khu vực hay không?',
    acceptLabel: 'Xác nhận',
    rejectLabel: 'Huỷ bỏ',
    rejectButtonStyleClass: 'p-button-outlined p-button-danger'
  }
  export const ErrorModalSlot = {
    key: 'errorDialog',
    header: 'Có lỗi xảy ra',
    message: 'Khu vực này đã tồn tại',
    acceptLabel: 'Xác nhận',
    rejectLabel: 'Huỷ bỏ',
    rejectButtonStyleClass: 'p-button-outlined p-button-danger'
  }
  export const DeleteModalSlot = {
    key: 'errorDialog',
    header: 'Bạn có muốn xóa ',
    message: 'Bạn có muốn xóa khu vực hay không?',
    acceptLabel: 'Xác nhận',
    rejectLabel: 'Huỷ bỏ',
    rejectButtonStyleClass: 'p-button-outlined p-button-danger'
  }