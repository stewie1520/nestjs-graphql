import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from './common/modules/config';
import { DateScalar } from './common/scalars/date.scalar';
import { EmailScalar } from './common/scalars/email.scalar';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      driver: ApolloDriver,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService): MongooseModuleFactoryOptions => {
        return {
          uri: configService.get('MONGO_URI'),
          maxPoolSize: 50,
          autoIndex: false,
          autoCreate: false,
          appName: 'nestjs-graphql',
        }
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
  ],
  providers: [DateScalar, EmailScalar],
})
export class AppModule { }
