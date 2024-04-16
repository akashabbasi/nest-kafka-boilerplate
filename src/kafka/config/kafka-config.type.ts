export type KafkaConfig = {
  allowAutoTopicCreation: boolean
  topics: [{
    name: string,
    partitions: number,
    replicationFactor: number,
  }]
  producer: {
    sendTimeout: number,
  }
};