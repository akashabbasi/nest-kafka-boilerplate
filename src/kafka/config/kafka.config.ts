import { registerAs } from '@nestjs/config';

import {
  IsInt,
  IsString,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import validateConfig from 'src/common/validation/validate-config';
import { KafkaConfig } from './kafka-config.type';
import { IsUpperCamelCase } from 'src/common/validation/constraints/is-upper-camel-case.constraint';

class EnvironmentVariablesValidator {
  @IsString()
  @IsUpperCamelCase()
  USER_SIGNUP_V1_TOPIC_NAME: string;

  @IsInt()
  @IsPositive()
  USER_SIGNUP_V1_TOPIC_PARTITIONS: number;

  @IsNumber()
  @IsPositive()
  USER_SIGNUP_V1_TOPIC_REPLICATION_FACTOR: number;

  @IsBoolean()
  KAFKA_ALLOW_AUTO_TOPIC_CREATION: boolean;

  @IsInt()
  KAFKA_PRODUCER_SEND_TIMEOUT: number;
}

export default registerAs<KafkaConfig>('kafka', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    allowAutoTopicCreation: process.env.KAFKA_ALLOW_AUTO_TOPIC_CREATION === 'true',
    topics: [{
      name: process.env.USER_SIGNUP_V1_TOPIC_NAME,
      partitions: parseInt(process.env.USER_SIGNUP_V1_TOPIC_PARTITIONS),
      replicationFactor: parseInt(process.env.USER_SIGNUP_V1_TOPIC_REPLICATION_FACTOR)
    }],
    producer: {
      sendTimeout: parseInt(process.env.KAFKA_PRODUCER_SEND_TIMEOUT)
    }
  };
});