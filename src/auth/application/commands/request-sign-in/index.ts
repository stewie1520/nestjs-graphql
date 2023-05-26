import { Inject } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidV4 } from 'uuid';

import { SIGN_IN_TOKEN_REPOSITORY, SignInTokenRepository } from "../../repository/sign-in-token.repository";
import { RequestSignInResponse } from "./response";

export class RequestSignInCommand implements ICommand {
  constructor(
    public readonly phoneNumber: string,
  ) {
  }
}

@CommandHandler(RequestSignInCommand)
export class RequestSignInHandler implements ICommandHandler<RequestSignInCommand, RequestSignInResponse> {
  constructor(
    @Inject(SIGN_IN_TOKEN_REPOSITORY) private readonly signInTokenRepository: SignInTokenRepository,
  ) {
  }

  async execute(command: RequestSignInCommand): Promise<RequestSignInResponse> {
    const payload = {
      phoneNumber: command.phoneNumber,
      token: uuidV4(),
      expiredAt: new Date(Date.now() + 1000 * 60 * 5),
      otp: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
    }

    await this.signInTokenRepository.upsertSignInToken(payload)

    return {
      phoneNumber: payload.phoneNumber,
      token: payload.token,
      expiredAt: payload.expiredAt,
    }
  }
}
