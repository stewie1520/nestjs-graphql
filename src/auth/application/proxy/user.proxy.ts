interface GetUserByPhoneNumberResponse {
  id: string;
  phoneNumber: string;
  fullName: string;
}

export abstract class UserProxy {
  abstract getUserByPhoneNumber(phoneNumber: string): Promise<GetUserByPhoneNumberResponse | null>;
}
