const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bannir une personne",
        usage: "[nom | pseudo | mention | ID] <raison> (optionel)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**Je n'ai pas l'autorisation de bannir les utilisateurs ! - [BAN_MEMBERS]**");
            if (!args[0]) return message.channel.send("**Merci d'ajouter le nom de la personne qui devrait être bannie !**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**Le membre n'est pas dans ce serveur !**");
            if (banMember === message.member) return message.channel.send("**Vous ne pouvez pas vous bannir vous même !**")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**Impossible d'éxpulser cette utilisateur!**")
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**Hello, Vous avez été banni de ${message.guild.name} pour - ${reason || "Pas de raison"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** a été banni pour ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** a été banni!`)
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banni**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banni par**", message.author.username)
                .addField("**Raison**", `${reason || "**Pas de raison**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};