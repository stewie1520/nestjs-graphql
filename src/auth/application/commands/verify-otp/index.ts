import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { VerifyOTPResponse } from "./response";
import { Inject } from "@nestjs/common";
import { SIGN_IN_TOKEN_REPOSITORY, SignInTokenRepository } from "../../repository/sign-in-token.repository";
import { InvalidToken } from "src/auth/domain/errors/invalid-token.error";
import { JwtService } from "@nestjs/jwt";
import { UserProxy } from "../../proxy/user.proxy";
import { UserNotFound } from "src/auth/domain/errors/user-not-found.error";

export class VerifyOTPCommand implements ICommand {
  constructor(
    public readonly phoneNumber: string,
    public readonly otp: string,
    public readonly token: string,
  ) {
  }
}

@CommandHandler(VerifyOTPCommand)
export class VerifyOTPCommandHandler implements ICommandHandler<VerifyOTPCommand, VerifyOTPResponse> {
  constructor(
    @Inject(SIGN_IN_TOKEN_REPOSITORY) private readonly signInTokenRepository: SignInTokenRepository,
    private readonly jwtService: JwtService,
    private readonly userProxy: UserProxy,
  ) {}

  async execute(command: VerifyOTPCommand): Promise<VerifyOTPResponse> {
    const entity = await this.signInTokenRepository.findOne(command.token, command.phoneNumber)
    if (!entity) {
      throw new InvalidToken("token not found", command);
    }

    const invalidTokenError = new InvalidToken("otp is expired or invalid", command);

    if (entity?.otp !== command.otp) {
      throw invalidTokenError;
    }

    if (entity.isExpired()) {
      throw invalidTokenError;
    }

    const user = await this.userProxy.getUserByPhoneNumber(command.phoneNumber)
    if (!user) {
      throw new UserNotFound(command.phoneNumber)
    }

    const accessToken = this.jwtService.sign({ sub: user.id, type: 'accessToken' }, { expiresIn: '7d' })
    const refreshToken = this.jwtService.sign({ sub: user.id, type: 'refreshToken' }, { expiresIn: '1 month' })

    return {
      accessToken,
      refreshToken,
    }
  }
}
