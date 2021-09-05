const schema = require('../../schemas/custom-commands');
const Discord = require('discord.js');

module.exports = {
    name: 'custom-delete',
    async execute(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

        const customname = args[0];

        if(!customname) return message.channel.send('Please specify the command name');

        const data = await schema.findOne({ Guild: message.guild.id, Command: customname });
        if(!data) return message.channel.send('That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: customname });
        const customembed = new Discord.MessageEmbed()
	.setTitle("Custom command removed")
	.addField("Custom command removed by:", message.author)
	.setThumbnail(message.author.displayAvatarURL())
	.setFooter('Time custom command removed', message.author.displayAvatarURL())
	.setTimestamp()
        message.react("✅")
        client.channels.cache.get(`824194262279127060`).send(customembed)
    }
}