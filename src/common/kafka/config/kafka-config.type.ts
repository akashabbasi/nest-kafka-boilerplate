export type KafkaConfig = {
  clientID: string;
  admin: {
    clientID: string;
  };
  brokers: string[]
  consumer: {
    enable: boolean
    group: string
  }
};
