import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { GetUserByPhoneNumberHandler } from "./application/query/getUserByPhoneNumber/indext";
import { USER_REPOSITORY } from "./application/repositories/user.repository";
import { USER_MODEL, UserSchema } from "./infrastructure/database/mongodb/models/user.model";
import { MongodbUserRepository } from "./infrastructure/database/mongodb/repositories/mongo-user.repository";

const repositoryProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: MongodbUserRepository,
  }
];

const queryHandlers = [
  GetUserByPhoneNumberHandler
]

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema }
    ]),
  ],
  providers: [
    ...repositoryProviders,
    ...queryHandlers,
  ]
})
export class UserModule {}
