module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);


        
        console.log(`${new Date }---stop playing requested by :---${message.member}---clear cache......`);

        client.player.setRepeatMode(message, false);
        client.player.stop(message);

        message.delete();

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: "stop" },
                footer: { text: 'ready as always!' },
                fields: [
                    { name: 'disconnected from:', value:message.member.voice.channel.name, inline: true },
                    {name: "done by:",value: message.member  },
                ],
                timestamp: new Date(),
            },
        });
    
    }};