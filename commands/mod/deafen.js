const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        description: "Deafen a member in a voice channel",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Vous n'avez pas la permission de bannir les utilisateurs ! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Impossible de trouver le membre dans le serveur !")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison fournie"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Succès ✅ : Member Deafened")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oops! Une erreur est survenue. Merci de réessayer plus tard.")
        }

    }
}