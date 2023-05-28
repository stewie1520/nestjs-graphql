import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRepository } from "src/user/application/repositories/user.repository";
import { UserEntity } from "src/user/domain/entities/user.entity";
import { USER_MODEL, UserDocument, userDocumentToEntity } from "../models/user.model";

export class MongodbUserRepository implements UserRepository {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>
  ) {}

  async findByPhoneNumber(phoneNumber: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({
      phoneNumber
    })

    if (!doc) return null

    return userDocumentToEntity(doc)
  }

}
