import { BaseEntity } from "src/common/entities/base.entity";
import { UniqueId } from "src/common/entities/identifier";

interface SignInTokenProps {
  expiredAt: Date;
  phoneNumber: string;
  token: string;
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

  public static create(props: SignInTokenProps, id?: UniqueId) {
    return new SignInTokenEntity(props, id);
  }
}
