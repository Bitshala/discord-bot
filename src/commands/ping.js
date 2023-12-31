const data = {
    name: "ping",
    description: "Pong!",
};

function run({ interaction, client }) {
    interaction.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
}

const options = {
    devOnly: true,
};

module.exports = { data, run, options };
