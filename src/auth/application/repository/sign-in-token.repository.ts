import { SignInTokenEntity } from "src/auth/domain/entities/sign-in-token.entity";

export const SIGN_IN_TOKEN_REPOSITORY = Symbol('SIGN_IN_TOKEN_REPOSITORY');

export interface SignInTokenRepository {
  upsert(payload: SignInTokenEntity): Promise<void>;
  findOne(token: string, phoneNumber: string): Promise<SignInTokenEntity | null>;
}
