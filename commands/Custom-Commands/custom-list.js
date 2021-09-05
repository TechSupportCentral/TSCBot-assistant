const schema = require('../../schemas/custom-commands');
const Discord = require('discord.js');

module.exports = {
    name: "custom-list",
    async execute(client, message, args) {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send('There is no custom commands!');
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
    }
}