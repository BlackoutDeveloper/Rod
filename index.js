const { Collection, Client, Intents, Permissions, MessageEmbed, Message, MessageAttachment } = require('discord.js');
const { Discord } = require('discord.js')
// Intents
const myIntents = new Intents();
// Guild Intents
myIntents.add('GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS');
// Direct Intents
myIntents.add('DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS');
const fs = require('fs')
const prefix = 'r!'
// Client Creation
const client = new Client({
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: true
    },
    intents: myIntents
});
const config = require('./configs/config.json')
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
console.log('123')
client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	console.log(`Ready! Signed in as ${client.user.username}`);
	client.user.setStatus('online')
	client.user.setActivity('Duels', { type: 'PLAYING' });
	

});
client.on('messageCreate', async (message) => {
	if(!message.guild || message.author.bot) return;
	
	
    if(!message.content.startsWith(prefix)) return;

	try {
		if(!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		let command = client.commands.get(cmd);
		if(!command) command = client.commands.get(client.aliases.get(cmd));
		if(!command) return;
		command.run(client, message, args);
	}
	catch (err) {
		message.channel.send(`\`${err}\``);
		return;
	}
	
});
client.on('interactionCreate', async (interaction) => {
	
})
client.login(token)
//use own token