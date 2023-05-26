import mongoose, { Document } from "mongoose";

export const SIGN_IN_TOKEN_MODEL = 'SIGN_IN_TOKEN_MODEL';

export const SignInTokenSchema = new mongoose.Schema({
  expiredAt: Date,
  phoneNumber: String,
  token: String,
  otp: String,
});

export interface SignInTokenDocument extends Document {
  expiredAt: Date,
  phoneNumber: string,
  token: string,
  otp: string,
}
