import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '@nestjs/config';
import config from 'src/configs/index'

@Module({
  imports: [
    // config module
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: ['.env'],
      cache: true,
      expandVariables: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    // common module
    CommonModule

    // feature module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
