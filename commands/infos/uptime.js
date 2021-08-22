module.exports = {
    name: 'uptime',
    aliases: [`up`],
    category: 'Infos',
    utilisation: '{prefix}uptime',


    execute (client,message)  {

    const moment = require("moment"); require("moment-duration-format"); const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]"); 

    message.channel.send({
        embed: {
            color: 'GREEN',
            author: { name: "Uptime" },
            fields: [
{name: `up since:`,  value: duration}


            ],


        }})}}