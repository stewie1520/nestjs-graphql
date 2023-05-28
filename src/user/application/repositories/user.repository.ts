import { UserEntity } from "src/user/domain/entities/user.entity";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  findByPhoneNumber(phoneNumber: string): Promise<UserEntity | null>;
}
