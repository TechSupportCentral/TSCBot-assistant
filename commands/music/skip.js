const { delay } = require("bluebird");

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',

    execute(client, message) {

       
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        
       

            


            console.log(`${new Date }------skipped:------${message.member}`);

            

        client.player.skip(message);

        message.delete();

        message.channel.send({
            embed: {
                color: 'GREEN',
                author: { name: "SKIP" },
                footer: { text: 'ready as always!' },
                fields: [
                    { name: 'VC:', value:message.member.voice.channel.name, inline: true },
                    {name: "done by:",value: message.member  },
                    {name: "ping", value: client.ws.ping},
                ],
                timestamp: new Date(),
            },
        });
    
        }};
