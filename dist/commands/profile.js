"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("quick.db");
class profile {
    name() {
        return "profile";
    }
    help() {
        return "View any Linty's profile! You can only view your own profile if you\'re a student.";
    }
    cooldown() {
        return 2;
    }
    isThisInteraction(command) {
        return command === "profile";
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name())
            .setDescription(this.help())
            .addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(false));
    }
    perms() {
        return 'both';
    }
    runCommand(interaction, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = interaction.options.getUser('target');
            if (user == null) {
                user = interaction.user;
            }
            let embed = new Discord.MessageEmbed();
            embed.setTitle(`${user.username}'s Profile`)
                .setDescription(`Here is your info!`)
                .setAuthor(user.username, user.avatarURL())
                .setColor('RANDOM')
                .addField(`Points`, `**${db.get(`${user.id}.points`)}**`, true)
                .addField(`Strikes`, `**${db.get(`${user.id}.strikes`)}**`, true)
                .addField(`Absences`, `**${db.get(`${user.id}.absences`)}**`, true)
                .setThumbnail(user.avatarURL())
                .setTimestamp(new Date())
                .setFooter('DisCourse Profile');
            yield interaction.reply({ content: `Here is ${user}'s profile`, embeds: [embed], ephemeral: true });
        });
    }
}
exports.default = profile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQy9ELCtCQUErQjtBQUcvQixNQUFxQixPQUFPO0lBRXhCLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sb0ZBQW9GLENBQUM7SUFDaEcsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxPQUFlO1FBQzdCLE9BQU8sT0FBTyxLQUFLLFNBQVMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxtQkFBbUIsRUFBRTthQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3BCLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDckIsYUFBYSxDQUFDLENBQUMsTUFBVSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFFSSxVQUFVLENBQUMsV0FBdUMsRUFBRSxHQUFtQjs7WUFDekUsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFDO2dCQUNiLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLFlBQVksQ0FBQztpQkFDM0MsY0FBYyxDQUFDLG9CQUFvQixDQUFDO2lCQUNwQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsU0FBUyxFQUFHLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7aUJBQ2xCLFFBQVEsQ0FBQyxRQUFRLEVBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUM7aUJBQzVELFFBQVEsQ0FBQyxTQUFTLEVBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUM7aUJBQzlELFFBQVEsQ0FBQyxVQUFVLEVBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUM7aUJBQ2hFLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHLENBQUM7aUJBQy9CLFlBQVksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2lCQUN4QixTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNoQyxNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsV0FBVyxJQUFJLFlBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNyRyxDQUFDO0tBQUE7Q0FFSjtBQS9DTCwwQkErQ0sifQ==