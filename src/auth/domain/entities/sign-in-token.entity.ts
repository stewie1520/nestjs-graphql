import { BaseEntity } from "src/common/domains/base.entity";
import { UniqueId } from "src/common/domains/identifier";

interface SignInTokenProps {
  expiredAt: Date;
  phoneNumber: string;
  token: string;
  otp: string;
}

export class SignInTokenEntity extends BaseEntity<SignInTokenProps> {
  private constructor(props: SignInTokenProps, id?: UniqueId) {
    super(props, id);
  }

  get expiredAt() {
    return this.props.expiredAt;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  get token() {
    return this.props.token;
  }

  get otp() {
    return this.props.otp;
  }

  isExpired(leewaySeconds: number = 0) {
    return this.expiredAt.getTime() < Date.now() - leewaySeconds * 1000
  }

  public static create(props: SignInTokenProps, id?: UniqueId) {
    return new SignInTokenEntity(props, id);
  }
}
