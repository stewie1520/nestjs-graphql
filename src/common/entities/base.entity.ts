import { UniqueId } from "./identifier";

export interface BaseProps {
  [key: string]: any;
  id?: never;
};

export abstract class BaseEntity<IProps extends BaseProps> {
  protected _id: UniqueId;
  protected props: IProps;

  constructor(props: IProps, id?: UniqueId) {
    this._id = id || new UniqueId();
    this.props = props;
  }

  getProps(): IProps {
    return {
      ...this.props,
    };
  }

  getPropsWithId(): IProps & { id: UniqueId } {
    return {
      ...this.props,
      id: this.id,
    };
  }

  get id() {
    return this._id;
  }
}
