import { Types } from 'mongoose'

export class UniqueId {
  private readonly _id: Types.ObjectId;

  constructor(id?: Types.ObjectId) {
    this._id = id || new Types.ObjectId();
  }

  get id() {
    return this._id
  }

  equals(id: UniqueId): boolean {
    return this._id.equals(id.id)
  }

  toString(): string {
    return this._id.toHexString()
  }
}
