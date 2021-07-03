const { PREFIX, LAVA_HOST, LAVA_PASSWORD, LAVA_PORT  } = require('../../config');
const { MessageEmbed } = require("discord.js")

module.exports = async bot => {
    console.log(`${bot.user.username} est disponible!`)
    var activities = [ `${bot.guilds.cache.size} serveurs`, `Senpai...`, `mon maître ilkya#6645 est le meilleur`, `Je regarde aussi des memes :)` ], i = 0;
    setInterval(() => bot.user.setActivity(`${PREFIX}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)
    
};
