import amqplib from 'amqplib';
import * as emailService from  '../services/email.service.js';
export const sendEmailConsumer = async () => {
    try {
       const connection = await amqplib.connect(process.env.RABBITMQ_HOST) 
       const channel = await  connection.createChannel();
       await channel.assertQueue(process.env.SEND_VERIFICATION_MAIL_WORKER, {durable: true});
       await channel.prefetch(1);
       channel.consume(process.env.SEND_VERIFICATION_MAIL_WORKER, async data => {
        if (!data) {
            return;
        }
        const message = JSON.parse(data.content.toString());
        await emailService.sendEmail(message.email, message.verificationCode);
        channel.ack(data);
    });
    } catch (error) {
        console.log(`Error while receiving message from ${queueName} ${error.message}`);
        throw error;
    }
 
};
