export const SIGN_IN_TOKEN_REPOSITORY = Symbol('SIGN_IN_TOKEN_REPOSITORY');

export interface SignInTokenRepository {
  upsertSignInToken(payload: { otp: string, token: string, phoneNumber: string, expiredAt: Date }): Promise<void>;
}
