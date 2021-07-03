const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
      name: "dm",
      description: "DM a user in the guild",
      aliases: ['pm']
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Vous n'avez pas mentionné l'utilisateur ou vous avez entré un ID invalide !`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Vous n'avez pas spécifié le message!");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("Cet utilisateur ne peut pas être DM"))
        .then(() => message.channel.send(`Message envoyé à ${user.user.tag}`));
    },
  };