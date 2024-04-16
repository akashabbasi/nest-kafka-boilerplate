import { Module } from '@nestjs/common';
import { KafkaAdminModule } from './kafka/kafka.admin.module';

@Module({
  imports: [
    KafkaAdminModule
  ],
  controllers: [],
  providers: [],
})
export class CommonModule {}
