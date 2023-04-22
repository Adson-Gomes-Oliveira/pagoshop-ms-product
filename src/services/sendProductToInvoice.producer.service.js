const amqplib = require('amqplib');
require('dotenv').config();

const RABBIT_MQ_CONNECT = process.env.RABBIT_STRING || 'amqp://guest:guest@rabbit-ms-gateway:5672';

const sendProductToInvoice = async (exchange, payload) => {
  const connectionMQ = await amqplib.connect(RABBIT_MQ_CONNECT);
  const producerChannel = await connectionMQ.createChannel();
  producerChannel.publish(exchange, '', Buffer.from(JSON.stringify(payload)));
  await producerChannel.close();
  connectionMQ.close();
};

module.exports = sendProductToInvoice;
