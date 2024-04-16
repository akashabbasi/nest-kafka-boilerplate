import { registerAs } from '@nestjs/config';

import { IsBoolean, IsString } from 'class-validator';
import validateConfig from 'src/common/validation/validate-config';
import { KafkaConfig } from './kafka-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  KAFKA_CLIENT_ID: string;

  @IsString()
  KAFKA_ADMIN_CLIENT_ID: string;

  @IsString()
  KAFKA_BROKERS: string;

  @IsBoolean()
  KAFKA_CONSUMER_ENABLE: boolean;

  @IsString()
  KAFKA_CONSUMER_GROUP: string;
}

export default registerAs<KafkaConfig>('kafka', (): KafkaConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    clientID: process.env.KAFKA_CLIENT_ID,
    admin: {
      clientID: process.env.KAFKA_ADMIN_CLIENT_ID,
    },
    brokers: process.env.KAFKA_BROKERS.includes(',') ? 
      process.env.KAFKA_BROKERS.split(',').map(item => item.trim()) 
      : [process.env.KAFKA_BROKERS.trim()],
    consumer: {
      enable: process.env.KAFKA_CONSUMER_ENABLE === 'true',
      group: process.env.KAFKA_CONSUMER_GROUP,
    },
  };
});
