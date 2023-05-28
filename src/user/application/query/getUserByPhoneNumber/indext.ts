import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByPhoneNumberResponse, fromDomainToResponse } from "./response";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../repositories/user.repository";

export class GetUserByPhoneNumberQuery implements IQuery {
  constructor(
    public readonly phoneNumber: string,
  ) {
  }
}

@QueryHandler(GetUserByPhoneNumberQuery)
export class GetUserByPhoneNumberHandler implements IQueryHandler<GetUserByPhoneNumberQuery, GetUserByPhoneNumberResponse | null> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUserByPhoneNumberQuery): Promise<GetUserByPhoneNumberResponse | null> {
    const user = await this.userRepository.findByPhoneNumber(query.phoneNumber)
    if (!user) return null

    return fromDomainToResponse(user)
  }
}
