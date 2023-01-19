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
const __1 = require("..");
class help {
    name() {
        return "help";
    }
    help() {
        return "A list of all commands available to you.";
    }
    cooldown() {
        return 2;
    }
    isThisInteraction(command) {
        return command === "help";
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name())
            .setDescription(this.help());
    }
    perms() {
        return 'both';
    }
    runCommand(interaction, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Linty's Commands")
                .setDescription(`Here are a list of Lintahlo's commands.`)
                .setColor('BLURPLE');
            __1.helpUtil.get().forEach((helpPerm, name) => {
                embed.addField('/' + name, helpPerm[0]);
            });
            yield interaction.reply({ embeds: [embed], ephemeral: true });
        });
    }
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQy9ELDBCQUE4QjtBQUU5QixNQUFxQixJQUFJO0lBRXJCLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sMENBQTBDLENBQUM7SUFDdEQsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxPQUFlO1FBQzdCLE9BQU8sT0FBTyxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxtQkFBbUIsRUFBRTthQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3BCLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFFSSxVQUFVLENBQUMsV0FBZ0IsRUFBRSxHQUFtQjs7WUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDakMsY0FBYyxDQUFDLHlDQUF5QyxDQUFDO2lCQUN6RCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckIsWUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWtCLEVBQUMsSUFBWSxFQUFFLEVBQUU7Z0JBQ3ZELEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFDLElBQUksRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7S0FBQTtDQUNKO0FBckNELHVCQXFDQyJ9