import amqplib from 'amqplib';

export async function sendToQueue(queueName, data) {
    try {
       const connection = await amqplib.connect(process.env.RABBITMQ_HOST) 
       const channel = await  connection.createChannel();
       await channel.assertQueue(queueName, {durable: true});
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
        persistent: true,
        contentType: 'application/json'
        });
    } catch (error) {
        console.log(`Error while sending message to ${queueName} ${error.message}`);
        throw error;
    }
 
}