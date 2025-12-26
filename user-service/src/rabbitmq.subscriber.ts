import amqp from "amqplib";

const EXCHANGE = "app_events";

async function startSubscriber() {
    const RETRY_INTERVAL = 5000;
    const MAX_RETRIES = 10;
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            const connection = await amqp.connect("amqp://rabbitmq");
            const channel = await connection.createChannel();

            await channel.assertExchange(EXCHANGE, "topic", { durable: false });

            const queue = await channel.assertQueue("", { exclusive: true });

            await channel.bindQueue(queue.queue, EXCHANGE, "user.*");

            console.log("Waiting for user events...");

            channel.consume(queue.queue, msg => {
                if (!msg) return;

                const event = JSON.parse(msg.content.toString());
                console.log("EVENT RECEIVED:", event);

                console.log("User-service handled event:", event.event);
            });

            connection.on("error", (err) => {
                console.error("RabbitMQ connection error", err);
                startSubscriber();
            });

            connection.on("close", () => {
                console.error("RabbitMQ connection closed");
                startSubscriber();
            });

            return; // Success, exit retry loop
        } catch (error) {
            console.error(`RabbitMQ connection failed (attempt ${retries + 1}/${MAX_RETRIES}):`, error);
            retries++;
            await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
        }
    }

    console.error("Could not connect to RabbitMQ after multiple attempts.");
}

export { startSubscriber };
