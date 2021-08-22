module.exports = (client, message, track) => {

    const queue = client.player.getQueue(message);


  
   

      

   

    console.log(`${new Date }---playing:--- ${track.title}---${track.requestedBy.username}`);

    message.channel.send({
        embed: {
            color: 'RED',
            author: { name: track.title },
            footer: { text: 'ready as always!' },
            fields: [
                { name: 'channel', value: track.author, inline: true },
                { name: 'requested by', value: track.requestedBy.username, inline: true },
                { name: "Ping",value:client.ws.ping},
                {name: "how many songs in the list:" , value:queue.tracks.length },
                {name: "playing in channel:", value:message.member.voice.channel.name},
                { name: 'length', value: client.player.createProgressBar(message, { timecodes: true }), }
                
            
                

              
                
               
               
            ],
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    });




};


