import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { UserProxy } from "src/auth/application/proxy/user.proxy";
import { GetUserByPhoneNumberQuery } from "src/user/application/query/getUserByPhoneNumber/indext";
import { GetUserByPhoneNumberResponse } from "src/user/application/query/getUserByPhoneNumber/response";

@Injectable()
export class QueryBusUserProxy extends UserProxy {
  constructor(
    private readonly queryBus: QueryBus
  ) {
    super();
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<GetUserByPhoneNumberResponse | null> {
    const response = await this.queryBus.execute<
      GetUserByPhoneNumberQuery,
      GetUserByPhoneNumberResponse
    >(
      new GetUserByPhoneNumberQuery(phoneNumber)
    )

    if (!response) return null;

    return {
      id: response.id,
      phoneNumber: response.phoneNumber,
      fullName: response.fullName,
    }
  }
}
