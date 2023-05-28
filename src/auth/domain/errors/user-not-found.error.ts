import { DomainError } from "src/common/domains/domain.error";

export class UserNotFound extends DomainError {
  constructor(private readonly phoneNumber: string) {
    super("User not found");
  }

  details(): Record<string, unknown> {
    return {
      phoneNumber: this.phoneNumber,
    };
  }
}
