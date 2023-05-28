import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { RequestSignInHandler } from "./application/commands/request-sign-in";
import { VerifyOTPCommandHandler } from "./application/commands/verify-otp";
import { SIGN_IN_TOKEN_REPOSITORY } from "./application/repository/sign-in-token.repository";
import { SIGN_IN_TOKEN_MODEL, SignInTokenSchema } from "./infrastucture/database/mongodb/models/sign-in-token.model";
import { MongodbSignInTokenRepository } from "./infrastucture/database/mongodb/repositories/sign-in-token.repository";
import { AuthResolver } from "./infrastucture/graphql/resolvers/mutation.resolver";
import { UserProxy } from "./application/proxy/user.proxy";
import { QueryBusUserProxy } from "./infrastucture/proxy/querybus-user.proxy";

const repositoryProviders: Provider[] = [
  {
    provide: SIGN_IN_TOKEN_REPOSITORY,
    useClass: MongodbSignInTokenRepository,
  }
];

const proxyProviders: Provider[] = [
  {
    provide: UserProxy,
    useClass: QueryBusUserProxy
  }
]

const commandHandlers = [
  RequestSignInHandler,
  VerifyOTPCommandHandler,
]

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: SIGN_IN_TOKEN_MODEL, schema: SignInTokenSchema }
    ]),
  ],
  providers: [
    ...repositoryProviders,
    ...commandHandlers,
    ...proxyProviders,
    AuthResolver,
  ]
})
export class AuthModule {}
