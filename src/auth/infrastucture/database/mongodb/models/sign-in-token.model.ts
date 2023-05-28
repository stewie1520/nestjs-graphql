import mongoose, { Document } from 'mongoose';
import { SignInTokenEntity } from 'src/auth/domain/entities/sign-in-token.entity';
import { UniqueId } from 'src/common/domains/identifier';

export const SIGN_IN_TOKEN_MODEL = 'SIGN_IN_TOKEN_MODEL';

export const SignInTokenSchema = new mongoose.Schema({
  expiredAt: Date,
  phoneNumber: String,
  token: String,
  otp: String,
});

export interface SignInTokenDocument extends Document {
  expiredAt: Date;
  phoneNumber: string;
  token: string;
  otp: string;
}

export const signInTokenDocumentToEntity = (document: SignInTokenDocument): SignInTokenEntity =>
  SignInTokenEntity.create(
    {
      expiredAt: document.expiredAt,
      phoneNumber: document.phoneNumber,
      token: document.token,
      otp: document.otp,
    },
    new UniqueId(document._id),
  );
