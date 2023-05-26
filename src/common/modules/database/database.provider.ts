import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ConfigService } from '../config';

export const DATABASE_CONNECTION = Symbol();

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get('MONGO_URI'))
        .then((instance) => {
          console.log('🗂️ Connected to database');
          return instance;
        }),
    inject: [ConfigService],
  },
];
