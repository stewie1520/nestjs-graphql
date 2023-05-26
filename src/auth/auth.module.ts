import { Module, Provider } from "@nestjs/common";
import { RequestSignInHandler } from "./application/commands/request-sign-in";
import { SIGN_IN_TOKEN_REPOSITORY } from "./application/repository/sign-in-token.repository";
import { MongodbSignInTokenRepository } from "./infrastucture/database/mongodb/repositories/sign-in-token.repository";
import { AuthResolver } from "./infrastucture/graphql/resolvers/auth.resolver";
import { DatabaseModule } from "src/common/modules/database";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { SIGN_IN_TOKEN_MODEL, SignInTokenSchema } from "./infrastucture/database/mongodb/models/sign-in-token.model";

const repositoryProviders: Provider[] = [
  {
    provide: SIGN_IN_TOKEN_REPOSITORY,
    useClass: MongodbSignInTokenRepository,
  }
];

const commandHandlers = [
  RequestSignInHandler,
]

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
    MongooseModule.forFeature([
      { name: SIGN_IN_TOKEN_MODEL, schema: SignInTokenSchema }
    ])
  ],
  providers: [
    ...repositoryProviders,
    ...commandHandlers,
    AuthResolver,
  ]
})
export class AuthModule {}
