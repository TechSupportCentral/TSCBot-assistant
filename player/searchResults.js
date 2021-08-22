module.exports = (client, message, query, tracks) => {
    console.log(`${new Date }---searchresults:${message.member} `)
    message.channel.send({
        embed: {
            color: 'BLUE',
            author: { name: `Your searchresults! ${query}` },
            footer: { text: 'ready as always!' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });

};