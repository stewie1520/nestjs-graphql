import mongoose, { Document } from 'mongoose';
import { UniqueId } from 'src/common/domains/identifier';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export const USER_MODEL = 'USER_MODEL';

export const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  fullName: String,
});

export interface UserDocument extends Document {
  phoneNumber: string;
  fullName: string;
}

export const userDocumentToEntity = (document: UserDocument): UserEntity =>
  UserEntity.create(
    {
      phoneNumber: document.phoneNumber,
      fullName: document.fullName,
    },
    new UniqueId(document._id),
  );
