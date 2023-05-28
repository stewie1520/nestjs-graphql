import { UserEntity } from 'src/user/domain/entities/user.entity';

export interface GetUserByPhoneNumberResponse {
  id: string;
  phoneNumber: string;
  fullName: string;
}

export const fromDomainToResponse = (domain: UserEntity): GetUserByPhoneNumberResponse => ({
  id: domain.id.toString(),
  phoneNumber: domain.phoneNumber,
  fullName: domain.fullName,
});
