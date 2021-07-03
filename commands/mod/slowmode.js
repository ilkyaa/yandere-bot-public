module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `Vous n'avez pas spécifié de temps!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`Ce n'est pas un nombre...`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Slowmode ajouté dans ce salon **${args[0]}**`
    );
  },
};