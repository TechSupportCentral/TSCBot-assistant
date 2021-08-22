const Discord = require('discord.js')
const db = require('../../schemas/ticketss')
module.exports = {
      name: "save-show",
      description: "save-show a ticket",
async execute(client, message, args) {
	const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
	db.findOne({ ticketcreator: mentioned.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${mentioned.user.username}'s tickets`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | ticketsaver : ${message.guild.members.cache.get(w.saver).user.tag}\nTicket save : ${w.content}`
                        )
                    )
                    .setColor("BLACK")
                )
            } else {
                message.channel.send('no ticket saves by this user')
            }
})
}
}