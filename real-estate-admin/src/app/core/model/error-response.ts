export class ApiErrorResponse {
  constructor(public code: string, public message: string) {
    Object.setPrototypeOf(this, ApiErrorResponse.prototype);
  }
}

export class ApiErrorTokenInvalid {
  constructor(public code: string, public message: string) {
    Object.setPrototypeOf(this, ApiErrorTokenInvalid.prototype);
  }
}

export class ApiErrorForbidden {
  constructor(public code: string, public message: string) {
    Object.setPrototypeOf(this, ApiErrorForbidden.prototype);
  }
}

export class ApiErrorArgsInvalid {
  constructor(
    public code: string,
    public message: string,
    public params: any
  ) {
    Object.setPrototypeOf(this, ApiErrorArgsInvalid.prototype);
  }
}

export class ApiErrorGetUserInfo {
  constructor() {
    Object.setPrototypeOf(this, ApiErrorGetUserInfo.prototype);
  }
}

export class ApiErrorNotFound {
  constructor() {
    Object.setPrototypeOf(this, ApiErrorNotFound.prototype);
  }
}
