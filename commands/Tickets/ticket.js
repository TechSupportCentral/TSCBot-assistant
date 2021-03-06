const sourcebin = require('sourcebin')
const discord = require('discord.js');
const fs = require('fs');
const db = require('../../schemas/ticketss')
module.exports = {
  name: "ticket",
  description: "open a ticket!",
  async execute(client , message, args) {
    const channelYes = await message.guild.channels.create(`ticket: ${message.author.tag}`);
    const theuser = message.author.username
    const userid = message.author.id
    channelYes.setParent("824692821197062194");

    channelYes.updateOverwrite(message.guild.id, {
      SEND_MESSAGE: false,
      VIEW_CHANNEL: false,
    });
    channelYes.updateOverwrite(message.author, {
      SEND_MESSAGE: true,
      VIEW_CHANNEL: true,
    });

    const reactionMessage = await channelYes.send("Ticket created; please wait for one of the owners to respond.");

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("⛔");
    } catch (err) {
      channelYes.send("err");
      throw err;
    }
    const collector = reactionMessage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("KICK_MEMBERS"),
      { dispose: true }
    );

    collector.on("collect", (reaction, member) => {
      switch (reaction.emoji.name) {
        case "🔒":
          channelYes.updateOverwrite(message.author, { SEND_MESSAGES: false });
          break;
        case "⛔":
	let ohyes = member.id
          channelYes.send("This ticket will be closed in **5 seconds** (autosaved)");
          channelYes.messages.fetch().then(async (messages) => {
	const final = messages.array().reverse().map(yes => `${new Date(yes.createdAt).toLocaleString('en-US')} - ${yes.author.tag}: ${yes.attachments.size > 0 ? yes.attachments.first().proxyURL : yes.content}`).join('\n');
          let response;

          client.channels.cache.get('824692900772315196').send({
            embed: {
                color: 'BLUE',
                footer: { text: 'TSC-Intern' },
                fields: [
                    { name: 'Ticket-UserID:', value: userid },
                ],
                timestamp: new Date(),
                description: `Ticket closed and archieved`,
            },
        });

	try {
	response = await sourcebin.create([
		{
			name: ' ',
			content: final,
			languageId: 'text',
		},
		], {
			title: `chat message ${message.channel.name}`,
			description: 'yes',
		});
	}
	catch(e) {
		return message.channel.send('An error occurred, please try again!');
	}
          let thelink = response.url
          const embed = new discord.MessageEmbed()
          .setDescription(`click this -------->   ${response.url}`)
          .setColor('BLUE');

  db.findOne({ ticketcreator: userid}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    ticketcreator : userid,
                    content : [
                        {
                            saver : ohyes,
                            content : thelink,
                        }
                    ]
                })
            } else {
                const obj = {
                    saver: ohyes,
                    content : thelink,
                }
                data.content.push(obj)
            }
            data.save()
        });
  })
	setTimeout(() => channelYes.delete(), 5000);
          break;
      }
  });

    message.channel
      .send(`Your ticket is created in ${channelYes}.`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 7000);
        setTimeout(() => message.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
