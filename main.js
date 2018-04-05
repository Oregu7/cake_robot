const fs = require("fs");
const ip = require("ip");
const config = require("config");

const env = config.get("env");
const port = config.get("server.port");
const token = config.get("bot.token");
const bot = require("./app/bot");
//start bot
if (env === "development") {
    bot.telegram.setWebhook();
    bot.startPolling();
} else {
    // TLS options
    const tlsOptions = {
        key: fs.readFileSync("./webhook_pkey.pem"),
        cert: fs.readFileSync("./webhook_cert.pem"),
    };

    // Set telegram webhook
    bot.telegram.setWebhook(`https://${ip.address()}:${port}/bot-${token}`, {
        source: fs.readFileSync("./webhook_cert.pem"),
    });

    // Start https webhook
    bot.startWebhook(`/bot-${token}`, tlsOptions, port);
}