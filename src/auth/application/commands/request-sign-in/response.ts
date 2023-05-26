export interface RequestSignInResponse {
  token: string;
  expiredAt: Date;
  phoneNumber: string;
}
