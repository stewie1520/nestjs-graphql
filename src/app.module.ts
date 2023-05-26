import { Module } from '@nestjs/common';
import { join } from 'path'
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/modules/config';
import { DateScalar } from './common/scalars/date.scalar';
import { EmailScalar } from './common/scalars/email.scalar';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      driver: ApolloDriver,
    }),
    AuthModule,
  ],
  providers: [DateScalar, EmailScalar],
})
export class AppModule { }
