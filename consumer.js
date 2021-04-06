const { Kafka } = require("kafkajs");
const avro = require("avsc");

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting.....");
    await consumer.connect();
    console.log("Connected!");

    const type = avro.Type.forSchema({
      type: "record",
      fields: [
        { name: "kind", type: { type: "enum", symbols: ["CAT", "DOG"] } },
        { name: "name", type: "string" },
      ],
    });

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    await consumer.run({
      eachBatchAutoResolve: true,
      eachBatch: async ({ batch }) => {
        const messages = batch.messages.map((message) => ({
          offset: message.offset,
          key: message && message.key && message.key.toString(),
          value: message && message.value && JSON.parse(type.fromBuffer(message.value)),
          headers: message.headers,
        }));

        console.log(messages);
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  }
}
