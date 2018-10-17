const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const userid = config.userid;
const channelids = config.channelids;

client.login(config.token);
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
    if (message.author.id === userid) {
        channelids.forEach((id) => {
            if (message.channel.id === id[0]) {
                forwardMessage(message, id[1]);
            }
        });
    }
});

function forwardMessage(message, sendtoids) {
    let MessageAttachment;
    message.attachments.forEach((attachment) => {
        MessageAttachment = new Discord.Attachment(attachment.url, attachment.filename);
    });
    if (!MessageAttachment) {
        message.embeds.forEach((embed) => {
            if (embed.image) {
                MessageAttachment = new Discord.Attachment(message.embeds[0].image.url);
            }
        });
    }
    if (!MessageAttachment) {
        MessageAttachment = new Discord.Attachment(message.content);
    }
    console.log(MessageAttachment);
    sendtoids.forEach((channelid) => {
        client.channels.get(channelid)
            .send('', MessageAttachment)
            .catch(console.error);
    });
}
