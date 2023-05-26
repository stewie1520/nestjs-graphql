import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { SignInTokenDto } from "../dto/sign-in-token";
import { CommandBus } from "@nestjs/cqrs";
import { RequestSignInDto } from "../dto/request-sign-in.dto";
import { RequestSignInCommand } from "src/auth/application/commands/request-sign-in";
import { RequestSignInResponse } from "src/auth/application/commands/request-sign-in/response";

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

  // TODO: remove this later when we have a real query
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
