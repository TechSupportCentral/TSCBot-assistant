module.exports = (client, message, queue, track) => {
   

    message.channel.send({
        embed: {
            color: 'PURPLE',
            author: { name: "Song-added" },
            footer: { text: 'ready as always!' },
            fields: [
               {name: `**SONG**`, value: track.title }
            ],
            timestamp: new Date(),
        },
    });



    console.log(`${new Date }---added:---${track.title}---${track.requestedBy.username}`);





};