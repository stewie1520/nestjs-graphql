import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { SignInTokenDto } from "../dto/sign-in-token";
import { CommandBus } from "@nestjs/cqrs";
import { RequestSignInDto } from "../dto/request-sign-in.dto";
import { RequestSignInCommand } from "src/auth/application/commands/request-sign-in";
import { RequestSignInResponse } from "src/auth/application/commands/request-sign-in/response";
import { VerifyOtpOutDto } from "../dto/verify-otp-out.dto";
import { VerifyOtpInDto } from "../dto/verify-otp-in.dto";
import { VerifyOTPCommand } from "src/auth/application/commands/verify-otp";
import { VerifyOTPResponse } from "src/auth/application/commands/verify-otp/response";

@Resolver(of => SignInTokenDto)
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) { }

  @Mutation(returns => SignInTokenDto)
  async requestSignIn(@Args("request") request: RequestSignInDto): Promise<SignInTokenDto> {
    const { phoneNumber } = request;
    return await this.commandBus.execute<RequestSignInCommand, RequestSignInResponse>(
      new RequestSignInCommand(phoneNumber),
    );
  }

  @Mutation(returns => VerifyOtpOutDto)
  async verifyOtp(@Args("request") request: VerifyOtpInDto): Promise<VerifyOtpOutDto> {
    const command = new VerifyOTPCommand(request.phoneNumber, request.otp, request.token);

    return await this.commandBus.execute<VerifyOTPCommand, VerifyOTPResponse>(command);
  }

  // TODO: remove this later when we have a real query
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
