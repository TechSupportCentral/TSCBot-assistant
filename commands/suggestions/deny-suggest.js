const { Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: "deny-suggest",
    description: "something",
async execute(client, message, args) {
	if(!message.member.hasPermission("ADMINSTRATOR")) return message.channel.send("You don't have the right perms");
	const messageID = args[0];
	const denyQuery = args.slice(1).join(" ");
	if(!messageID) return message.channel.send("Would you specify an id?");
	if(!denyQuery) return message.reply("Will you write a reason why it was accepted?");
	try{
	    const suggestionChannel = message.guild.channels.cache.get('824677631181062196')
 	    const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
	  
	  const data =suggestedEmbed.embeds[0];
	  const acceptEmbed = new MessageEmbed()
	       .setAuthor(data.author.name, data.author.iconURL)
	       .setDescription(data.description)
                  .setColor("RED")
                  .addField('Status (DENIED)', denyQuery);
	message.react("✅");
	suggestedEmbed.edit(acceptEmbed);
	const user = await client.users.cache.find((u) => u.tag === data.author.name)
	user.send("Your suggestion has been denied by the owners");
}catch(err){
console.log(err)
message.reply("That suggestion does not exist in this universe");
}
}
}