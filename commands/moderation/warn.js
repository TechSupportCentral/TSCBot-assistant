const db = require('../../schemas/warns')
const { Message, MessageEmbed } = require('discord.js')


// komplexer code unter xd
module.exports = {
    name :'warn',
    async execute(client, message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return 
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        let reason = args.slice(1).join(" ")
        if(!reason) reason = 'Unspecified';
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setTitle('Warning')
        	  .setThumbnail(user.user.displayAvatarURL())
       	  .addField('User warned', user)
        	  .addField('Warned by', message.author)
       	  .addField('Reason', reason)
       	  .setFooter('Time warned', client.user.displayAvatarURL())
       	  .setTimestamp()
	  .setColor("RED")
        )
        message.react("✅")
        client.channels.cache.get(`824194262279127060`).send(new MessageEmbed()
        .setTitle('Warning')
        .setThumbnail(user.user.displayAvatarURL())
        .addField('User warned', user)
        .addField('User ID', user.id)
        .addField('Warned by', message.author)
        .addField('Reason', reason)
        .setFooter('Time warned', client.user.displayAvatarURL())
        .setTimestamp()
        )
    }
}
