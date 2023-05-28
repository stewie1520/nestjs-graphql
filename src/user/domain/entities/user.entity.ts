import { BaseEntity } from "src/common/domains/base.entity";
import { UniqueId } from "src/common/domains/identifier";

interface UserProps {
  phoneNumber: string;
  fullName: string;
}

export class UserEntity extends BaseEntity<UserProps> {
  private constructor(props: UserProps, id?: UniqueId) {
    super(props, id);
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  get fullName() {
    return this.props.fullName;
  }

  public static create(props: UserProps, id?: UniqueId) {
    return new UserEntity(props, id);
  }
}
