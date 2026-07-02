const amqp = require("amqplib");

async function publishUserCreated(user) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  const queue = "user.created";

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(user)),
    { persistent: true }
  );

  await channel.close();
  await connection.close();
}

module.exports = {
  publishUserCreated
};