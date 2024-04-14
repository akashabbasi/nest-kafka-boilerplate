export type KafkaConfig = {
  clientID: string;
  adminClientID: string;
  brokers: string;
  consumerEnable: boolean;
  consumerGroup: string;
};
