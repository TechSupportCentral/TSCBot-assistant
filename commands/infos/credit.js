module.exports = {
    name: 'credit',
    aliases: [`credits`],
    category: 'Infos',
    utilisation: '{prefix}credit',

    execute(client, message) {
        
        message.delete();
        
        message.channel.send({
            embed: {
                color: 'PURPLE',
                author: { name: "credits" },
                fields: [
                   {name: "Py-mainbot" , value: "Developed by BenTheTechGuy"},
                   {name: "Py assistant (Music ,Staff activity Tracking, credits,Tickets)  " , value : "by Philipp" },
                   {name: "Bot hosting" , value : "by Philipp"}
            
                ],

                },
    
      
        })

       

        message.channel.send({
            embed: {
                color: 'PURPLE',
                author: { name: "Github" },
                fields: [
                    {name: 'Link:' , value: "https://github.com/TechSupportCentral"}

                ]

            },


        })}}