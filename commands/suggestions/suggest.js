const { Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: "suggest",
    description: "something",
async execute(client, message, args) {
    const query = args.join(" ");
    if(!query) return message.reply("Please write a suggestion");
const embed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
  .setDescription(`**Suggestion**: ${query}`)
  .setColor("GREY")
  .setTimestamp()
  .addField("Status",'PENDING')
message.react("✅");
message.guild.channels.cache.get("824677631181062196").send(embed);
}
};