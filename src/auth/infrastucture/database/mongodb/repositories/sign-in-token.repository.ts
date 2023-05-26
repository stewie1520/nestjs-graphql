import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignInTokenRepository } from "src/auth/application/repository/sign-in-token.repository";
import { SIGN_IN_TOKEN_MODEL, SignInTokenDocument } from "../models/sign-in-token.model";

@Injectable()
export class MongodbSignInTokenRepository implements SignInTokenRepository {
  constructor(
    @InjectModel(SIGN_IN_TOKEN_MODEL) private readonly signInTokenModel: Model<SignInTokenDocument>,
  ) {
  }

  async upsertSignInToken(payload: { otp: string, token: string; phoneNumber: string; expiredAt: Date; }) {
    const doc = await this.signInTokenModel.findOne({
      phoneNumber: payload.phoneNumber,
      expiredAt: { $gt: new Date() },
    });

    if (!doc) {
      await this.signInTokenModel.create({
        token: payload.token,
        phoneNumber: payload.phoneNumber,
        expiredAt: payload.expiredAt,
        otp: payload.otp,
      })
    } else {
      doc.token = payload.token;
      doc.expiredAt = payload.expiredAt;
      doc.otp = payload.otp;
      await doc.save();
    }
  }
}
