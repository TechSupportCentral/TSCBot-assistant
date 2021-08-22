

const BypassroleandstaffID = '850684245927788554'
const spteamstaffchannel =  `824065058388181013`
const modtalk = `824057837491453982`
const botdevelopment = `824216769442218004`
const botcommands = `824326748426469396`
const Ownerarea = `824066908097740910`
const ticketcreate =  '824684376398233670'
	const suggestions =  '824926277868978186'
	const general =  '824042976371277888'
	const games = '824059985998381138'
	const setups = '824737989850169355'
	const memes =  '824738477291601980'
	const music =  '824067063941300224'
	const funbots =  '832535838289297408'
	const supportteam = '824065058388181013'
	const bump =  '824185956549787659'
	let generalsupport =  `824059680905101333`
let gamingsupport =  `824059755935957023`
let softwaresupport =  `824059831513907200`
let hardwaresupport =  `824059920826499093`
let vcchat =  `824061207924965416`
const  OwnerRoleID =  '824063311829925898'
const stafflogs =   '824194262279127060'
const messagefilterlog = '835519322909573190'
const DMlog  = '853984661360869386'
const messagedeletelog = '825774127661973545' 
const bannedlog = '824194262279127060'
 const messageeditlog = '825774068313358346'
const Nicknamelog = '825773983000690698'
const roleaddedremoved = '825785679220703243'
const unbannedlog = '824194262279127060'
const inviteslog = '833815923457654844' 
const welcome = '824060103119470622'
const joined = '824319260540010557'
const left = '824321468279947275'


const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

const { swears }  = require('./swears.json');

const {everyone} = require(`./Everyone.json`)

const {dcinvites} = require(`./dcinvites.json`)





// Mongo db definiton
const mongoose = require('mongoose')
const customschema = require('./schemas/custom-commands')
client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();
const Commando = require('discord.js-commando');



// Mongo DB connection
mongoose.connect('Database',{
         useUnifiedTopology : true,
         useNewUrlParser : true,
}).then(console.log("Connected to mongo db"));


fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

//activity points system



client.on("message", async (message) => {
	if(message.channel.type === `dm`) return ;
	if (!message.guild) return;
	if (message.author.bot) return; 


	const Levels = require("discord.js-leveling");
	
	

	let membersWithRole = message.guild.roles.cache.get(BypassroleandstaffID,OwnerRoleID).members;

	let staff = message.guild.roles.cache.get(BypassroleandstaffID);












	







	if(message.member.roles.cache.has(staff.id))  {

		if(message.channel.id === ticketcreate) return
		if(message.channel.id ===suggestions) return
		if(message.channel.id ===general) return
		if(message.channel.id ===games) return
		if(message.channel.id ===setups) return
		if(message.channel.id ===memes) return
		if(message.channel.id ===music) return
		if(message.channel.id ===funbots) return
		if(message.channel.id ===supportteam) return
		if(message.channel.id ===bump) return










		
		
	
		let owners = message.guild.roles.cache.get(OwnerRoleID);

		if (message.member.roles.cache.has(owners.id)) return

		

		

		const randomAmountOfXp = Math.floor(Math.random() * 10) + 1; 

	

  
   
  
   
   const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  
   if(hasLeveledUp) {

	



	  
		  const user = await Levels.fetch(message.author.id, message.guild.id);

		 
		  
		  console.log(`Activity  Point given: ${message.author.tag}`)


		  let channelID =  stafflogs
	let logdest = new discord.MessageEmbed()
		.setTitle(`Activity Point given`)
		.setDescription(` ${message.author.tag} Got a new Activity Point!`)
		.setColor("BLUE")
		.setTimestamp()
	client.channels.cache.get(channelID).send(logdest)

	

   }}})
	
	  // anti swear part
client.on('message', async message => {





	






	let yes = false;   
	var filter1;
    for(filter1 = 0;filter1 < swears.length; filter1++) {
      if(message.content.toLowerCase().includes(swears[filter1].toLowerCase()))
        yes = true; 
	}
	if(yes){
		const dmreplyembed = new discord.MessageEmbed()
		.setTitle('Automatically DM reply')
		.setDescription(`Hello this is a automatically send message as reply to a DM, please don't message our BOT if you want to tell us something do it on the Server thank you`)
		.setFooter('we can see every DM you send to the Bot')
		.setColor('BLUE')
		if (message.channel.type === 'dm') return message.channel.send(dmreplyembed)
		
		if (message.channel.id === spteamstaffchannel) return
		if (message.channel.id ===modtalk) return
		if (message.channel.id ===botdevelopment) return
		if (message.channel.id ===botcommands) return
		if (message.channel.id ===Ownerarea) return









	

		message.delete()
		let yesembed = new discord.MessageEmbed()
			.setTitle('Swear')
			.setThumbnail(message.author.displayAvatarURL())
			.addField('Swore by', message.author.tag)
			.addField('User ID', message.author.id)
			.addField('Message deleted', message.content)
			.setFooter('Time deleted', client.user.displayAvatarURL())
			.setTimestamp()
		let userembed = new discord.MessageEmbed()
			.setTitle('Swear')
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription("TEG is a pg friendly server, you cannot swear here")
			.addField('Message deleted', message.content)
			.setFooter('Time deleted', client.user.displayAvatarURL())
			.setTimestamp()
		client.channels.cache.get(messagefilterlog).send(yesembed)
		message.author.send(userembed)
	}
})


//@everyone filter
client.on('message', async message => {
	
	




	

	
	

	
	let yes = false;
	var Filter2;
    for(Filter2 = 0;Filter2 < everyone.length; Filter2++) {
      if(message.content.toLowerCase().includes(everyone[Filter2].toLowerCase()))
        yes = true; 
    }
	if(yes){
		const dmreplyembed = new discord.MessageEmbed()
.setTitle('Automatic DM reply')
.setDescription(`Hello this is a automatically send message as reply to a DM, please don't message our BOT if you want to tell us something do it on the Server thank you`)
.setFooter('we can see every DM you send to the Bot')
.setColor('BLUE')
if (message.channel.type === 'dm') return message.channel.send(dmreplyembed)
		let ownerid = OwnerRoleID;
	let membersWithRole = message.guild.roles.cache.get(ownerid).members;

		let owners = message.guild.roles.cache.get(OwnerRoleID)
if (message.member.roles.cache.has(owners.id)) return
if (message.channel.id ===spteamstaffchannel) return
if (message.channel.id ===modtalk) return
if (message.channel.id ===botdevelopment) return
if (message.channel.id ===botcommands) return
if (message.channel.id ===Ownerarea) return





		

		
		
		
		message.delete()
		let yesembed = new discord.MessageEmbed()
			.setTitle('Everyone-Ping')
			.setThumbnail(message.author.displayAvatarURL())
			.addField('by', message.author.tag)
			.addField('User ID', message.author.id)
			.addField('Message deleted', message.content)
			.setFooter('Time deleted', client.user.displayAvatarURL())
			.setTimestamp()
		let userembed = new discord.MessageEmbed()
			.setTitle('Everyone Ping')
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription("please don't ping @Everyone if you need help go to a support channel and ping @support-team")
			.addField('Message deleted', message.content)
			.setFooter('Time deleted', client.user.displayAvatarURL())
			.setTimestamp()
		client.channels.cache.get(messagefilterlog).send(yesembed)
		message.author.send(userembed)
	}
})

//Discord.gg filter
client.on('message', async message => {

	

	let yes = false;
   
    var filter3;
    for(filter3 = 0;filter3 < dcinvites.length; filter3++) {
      if(message.content.toLowerCase().includes(dcinvites[filter3].toLowerCase()))
        yes = true; 
    }
	if(yes){
		

		const dmreplyembed = new discord.MessageEmbed()
		.setTitle('Automatic DM reply')
		.setDescription(`Hello this is a automatically send message as reply to a DM, please don't message our BOT if you want to tell us something do it on the Server thank you`)
		.setFooter('we can see every DM you send to the Bot')
		.setColor('BLUE')
		if (message.channel.type === 'dm') return message.channel.send(dmreplyembed)



		let roleID = BypassroleandstaffID;
	let membersWithRole = message.guild.roles.cache.get(roleID).members;

	let bypass = message.guild.roles.cache.get(BypassroleandstaffID);

	if(message.member.roles.cache.has(bypass.id)) return

	
		message.delete()
		let yesembed = new discord.MessageEmbed()
			.setTitle('Self-promo')
			.setThumbnail(message.author.displayAvatarURL())
			.addField('by', message.author.tag)
			.addField('User ID', message.author.id)
			.addField('Message deleted', message.content)
			.setFooter('Time deleted', client.user.displayAvatarURL())
			.setTimestamp()
		let userembed = new discord.MessageEmbed()
			.setTitle('Self-Promo')
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription("Self-Promo isn't allowed on TEG!")
			.addField('Message deleted', message.content)
			.setFooter('Time deleted', client.user.displayAvatarURL())
			.setTimestamp()
		client.channels.cache.get(messagefilterlog).send(yesembed)
		message.author.send(userembed)
	}
})
  




//DM log
client.on('message', async (message) => {

	const dmmessage = message.channel.type === `dm`

	if (dmmessage)  {
if (message.author.bot) return;
if (!message.content) message.content = `couldn't detect, probably a image or unknown Emoji`
if(!message.author) message.author = `not able to detect`
if(!message.author.id) message.author.id = `couldn't detect the ID of the User`



		let channelID = DMlog
		let logdest = new discord.MessageEmbed()
			.setTitle(`DM`)
			.setDescription(`by:  ${message.author}`  )
			.addField(` **Content:**`, message.content)
			.addField(`User ID:`, message.author.id)
			.setColor("RED")
			.setTimestamp()
			client.channels.cache.get(channelID).send(logdest)

	}})









const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};



client.login(client.config.discord.token);
