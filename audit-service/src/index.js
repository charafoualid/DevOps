const amqp = require("amqplib");
const { MongoClient } = require("mongodb");

//const testLint = "pipeline moet falen";

async function start() {
  const mongoClient = new MongoClient(process.env.AUDIT_MONGO_URL);
  await mongoClient.connect();

  const db = mongoClient.db(process.env.AUDIT_DB_NAME);
  const auditLogs = db.collection("auditlogs");

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  const queue = "user.created";

  await channel.assertQueue(queue, { durable: true });

  console.log("Audit service luistert naar user.created");

  channel.consume(queue, async (message) => {
    const data = JSON.parse(message.content.toString());

    await auditLogs.insertOne({
      event: data.event,
      user: data.user,
      userId: data.userId,
      createdAt: new Date()
    });

    console.log("Audit event opgeslagen:", data.event);

    channel.ack(message);
  });
}

start().catch(console.error);