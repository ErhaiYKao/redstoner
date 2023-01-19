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
exports.helpUtil = exports.HelpUtil = void 0;
const Discord = require("discord.js");
const Config = require("./config");
var db = require('quick.db');
var userBehavior = new db.table('user');
var qid = new db.table('id');
const myIntents = new Discord.Intents();
myIntents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES);
const Bot = new Discord.Client({ intents: myIntents });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
let commands = [];
let events = [];
const cooldowns = new Discord.Collection();
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const vals = {
    questions: [],
    points: 0,
    strikes: 0,
    messages: [],
    absences: 0
};
let adminID = '1029224684434227200';
let guildID = '838203182630305822';
Bot.once("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("This bot is online!");
    Bot.user.setPresence({ activities: [{ name: 'Christopher Lintahlo Hu', type: 'WATCHING' }], status: 'online' });
    (_a = Bot.user) === null || _a === void 0 ? void 0 : _a.setUsername("Linty");
    Bot.guilds.fetch().then(() => {
        Bot.guilds.cache.forEach((guild) => __awaiter(void 0, void 0, void 0, function* () {
            guild.members.fetch().then((collection) => {
                collection.forEach((member) => {
                    if (!db.has(member.id)) {
                        db.set(member.id, vals);
                    }
                });
            });
        }));
    });
    yield ((_b = Bot.guilds.cache.get(guildID)) === null || _b === void 0 ? void 0 : _b.commands.fetch().then((col) => {
        loadCommands(`${__dirname}/commands`, col);
        loadEvents(`${__dirname}/events`);
    }));
}));
Bot.on("guildMemberAdd", member => {
    var _a;
    if (!db.has(member.id)) {
        db.set(member.id, vals);
    }
    (_a = Bot.guilds.cache.get(guildID)) === null || _a === void 0 ? void 0 : _a.commands.fetch().then((col) => {
        loadCommands(`${__dirname}/commands`, col);
        loadEvents(`${__dirname}/events`);
    });
});
Bot.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    handleCommand(interaction);
}));
Bot.on("messageCreate", msg => {
    if (msg.author.bot)
        return;
    handleEvent(msg);
    if (msg.channel.type == 'DM') {
        msg.author.send(`ye bastard, server only`);
        return;
    }
});
Bot.on("guildCreate", (guild) => __awaiter(void 0, void 0, void 0, function* () {
    guild.members.fetch().then((collection) => {
        collection.forEach((member) => {
            if (!db.has(member.id)) {
                db.set(member.id, vals);
            }
        });
    });
}));
function handleEvent(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let arr = db.get(`${msg.author.id}.messages`);
        if (arr.length < 10) {
            db.push(`${msg.author.id}.messages`, msg.content);
        }
        else {
            db.set(`${msg.author.id}.messages`, []);
        }
        for (const eventClass of events) {
            yield eventClass.runEvent(msg, Bot);
        }
    });
}
function handleCommand(interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let command = interaction.commandName;
        let args = [];
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisInteraction(command)) {
                    continue;
                }
                if (!cooldowns.has(commandClass.name())) {
                    cooldowns.set(commandClass.name(), new Discord.Collection());
                }
                const now = Date.now();
                const timestamps = cooldowns.get(commandClass.name());
                const cooldownAmount = (commandClass.cooldown() || 3) * 1000;
                if (timestamps.has((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.id)) {
                    const expirationTime = timestamps.get((_b = interaction.member) === null || _b === void 0 ? void 0 : _b.user.id) + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        if (timeLeft > 3600) {
                            return interaction.reply({ ephemeral: true, content: `please wait ${Math.round(timeLeft / 3600)} more hour(s) before reusing the \`${commandClass.name()}\` command.` });
                        }
                        else if (timeLeft > 60 && timeLeft < 3600) {
                            return interaction.reply({ ephemeral: true, content: `please wait ${Math.round(timeLeft / 60)} more minute(s) before reusing the \`${commandClass.name()}\` command.` });
                        }
                        else {
                            return interaction.reply({ ephemeral: true, content: `please wait ${Math.round(timeLeft)} more second(s) before reusing the \`${commandClass.name()}\` command.` });
                        }
                    }
                }
                timestamps.set((_c = interaction.member) === null || _c === void 0 ? void 0 : _c.user.id, now);
                setTimeout(() => { var _a; return timestamps.delete((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.id); }, cooldownAmount);
                yield commandClass.runCommand(interaction, Bot);
            }
            catch (e) {
                console.log(e);
            }
        }
    });
}
class HelpUtil {
    constructor() {
        this.helpMap = new Map();
    }
    add(name, help, perms) {
        this.helpMap.set(name, [help, perms]);
    }
    get() {
        return this.helpMap;
    }
}
exports.HelpUtil = HelpUtil;
exports.helpUtil = new HelpUtil();
function loadCommands(commandsPath, allSlashCommands) {
    if (!Config.config.commands || Config.config.commands.length == 0)
        return;
    let commandDatas = [];
    for (const commandName of Config.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        exports.helpUtil.add(command.name(), command.help(), command.perms());
        commands.push(command);
        commandDatas.push(command.data().toJSON());
    }
    const rest = new rest_1.REST({ version: '10' }).setToken(Config.config.token);
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Started refreshing application (/) commands.');
            yield rest.put(v9_1.Routes.applicationGuildCommands(Config.config.clientID, Config.config.guildID), { body: commandDatas });
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    }))();
}
function loadEvents(commandsPath) {
    if (!Config.config.events || Config.config.events.length == 0)
        return;
    for (const eventName of Config.config.events) {
        const eventsClass = require(`${commandsPath}/${eventName}`).default;
        const event = new eventsClass();
        events.push(event);
    }
}
Bot.login(Config.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLG1DQUFtQztBQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFHN0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckgsTUFBTSxHQUFHLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBS3JFLDBDQUF1QztBQUN2Qyw2Q0FBOEM7QUFHOUMsSUFBSSxRQUFRLEdBQXNCLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO0FBSzdCLE1BQU0sU0FBUyxHQUFRLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBR2hELFNBQVMsT0FBTyxDQUFDLEdBQVcsRUFBQyxHQUFXO0lBRWhDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxNQUFNLElB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