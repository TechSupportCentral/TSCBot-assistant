const db = require('../../schemas/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'unwarn',
    async execute(client, message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return 
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
	      message.react("✅")
                client.channels.cache.get(`824194262279127060`).send(new MessageEmbed()
                .setTitle('Unwarned')
        	      .setThumbnail(user.user.displayAvatarURL())
        	      .addField('User unwarned', user)
        	      .addField('Unwarned by', message.author)
        	      .setFooter('Time unwarned', client.user.displayAvatarURL())
        	      .setTimestamp()
 	)

            data.save()
            } else {
                message.channel.send('This user does not have any warns in this server')
            }
        })
    }
}