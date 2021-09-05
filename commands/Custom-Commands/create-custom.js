const schema = require('../../schemas/custom-commands');
const Discord = require('discord.js');

module.exports = {
    name: 'custom-create',
    async execute(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

        const customname = args[0]; 
        const response = args.slice(1).join(" ");

        if(!customname) return message.channel.send('Please specify the command name');
        if(!response) return message.channel.send('Please specify the response');

        const data = await schema.findOne({ Guild: message.guild.id, Command: customname });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: customname,
            Response: response
        })
        await newData.save();
        
        const customembed = new Discord.MessageEmbed()
	.setTitle("Custom command added")
	.addField("Custom command added by:", message.author)
	.addField("Custom command name:", customname)
	.addField("Custom command response", response)
	.setThumbnail(message.author.displayAvatarURL())
	.setFooter('Time custom command added', client.user.displayAvatarURL())
	.setTimestamp()
        message.react("✅")
        client.channels.cache.get(`824194262279127060`).send(customembed)
    }
}