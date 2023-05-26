import { Module } from '@nestjs/common';
import { ConfigProvider } from './config.provider';
import { ConfigService } from './config.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: ConfigService,
      useClass: ConfigProvider,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}

export * from './config.service'
