require('dotenv').config()
const { Client, MessageAttachment } = require('discord.js')
const messages = require('./functions/messages')

var client = new Client()

client.on('ready', function () {
  client.user.setActivity('Type >r help for more commands! ', { type: 4 })

  client.user.setActivity(`Estamos em ${client.users.cache.size} cliente${client.users.cache.size === 0 || client.users.cache.size === 1 ? '' : 's'}, em ${client.channels.cache.size} cana${client.channels.cache.size === 0 || client.channels.cache.size === 1 ? 'l' : 'is'}, em ${client.guilds.cache.size} servidor${client.guilds.cache.size === 0 || client.guilds.cache.size === 1 ? '' : 'es'}`)

  console.log(`Bot foi iniado com ${client.users.cache.size} cliente${client.users.cache.size === 0 || client.users.cache.size === 1 ? '' : 's'}, em ${client.channels.cache.size} cana${client.channels.cache.size === 0 || client.channels.cache.size === 1 ? 'l' : 'is'}, em ${client.guilds.cache.size} servidor${client.guilds.cache.size === 0 || client.guilds.cache.size === 1 ? '' : 'es'}`)
})

client.on('guildCreate', guild => {
  console.log(`o bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount}`)
})

client.on('guildDelete', guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`)
  client.user.setActivity(`Servidores: ${client.guilds.cache.size} servidor${client.guilds.cache.size === 0 || client.guilds.cache.size === 1 ? '' : 'es'}`)
})

client.on('message', async function (message) {
  if (!message.guild) return false
  if (message.author.equals(client.user)) return false

  const msg = message.content.split(':')
  messages(client, message, msg, MessageAttachment)
})

client.login(process.env.DISC_TOKEN)
