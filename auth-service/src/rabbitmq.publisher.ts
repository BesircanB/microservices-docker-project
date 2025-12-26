import amqp from "amqplib";

const EXCHANGE = "app_events";

export async function publishUserCreated(user: any) {
    const connection = await amqp.connect("amqps://vmdxqeez:VpFgODHQMmKArWLkOPex6wP5W_DzvLAW@cow.rmq2.cloudamqp.com/vmdxqeez");
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "topic", { durable: false });

    const event = {
        event: "user.created",
        data: user,
        timestamp: new Date().toISOString()
    };

    channel.publish(
        EXCHANGE,
        "user.created",
        Buffer.from(JSON.stringify(event))
    );

    console.log("EVENT PUBLISHED:", event);

    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);
}
