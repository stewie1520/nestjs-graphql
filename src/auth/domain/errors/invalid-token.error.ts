import { DomainError } from "src/common/domains/domain.error";

export class InvalidToken extends DomainError {
  constructor(
    message: string,
    private readonly _details: { token: string, phoneNumber: string, otp: string },
  ) {
    super(message);
  }

  details() {
    return this._details;
  }
}
