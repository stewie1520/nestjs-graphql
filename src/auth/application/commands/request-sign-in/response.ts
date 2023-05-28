import { SignInTokenEntity } from "src/auth/domain/entities/sign-in-token.entity";

export interface RequestSignInResponse {
  token: string;
  expiredAt: Date;
  phoneNumber: string;
}

export const fromDomainToResponse = (domain: SignInTokenEntity): RequestSignInResponse => {
  return {
    token: domain.token,
    expiredAt: domain.expiredAt,
    phoneNumber: domain.phoneNumber,
  }
}
