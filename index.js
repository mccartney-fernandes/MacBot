require('dotenv').config()
const { Client, MessageAttachment } = require('discord.js')
const axios = require('axios')
const helpBot = require('./comandHelp')
const gameSteam = require('./web-scraping')
const booksBible = require('./bibleBooks')

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

  if (msg[0] === 'ping') {
    const msg = await message.channel.send('Ping?')
    msg.edit(`Pong! A Latência é ${msg.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ping)}ms`)
  }

  if (msg[0] === '!h' || msg[0] === '!help') {
    message.channel.send(helpBot)
  }
  if (msg[0] === '!hbible' || msg[0] === '!helpbible') {
    booksBible.map(b => message.channel.send(`Livro: ${b.name}, Abreviação: ${b.abbrev.pt}`))
  }
  if (msg[0] === '!hbiblen' || msg[0] === '!helpbiblen') {
    booksBible.map(b => {
      if (b.testament === 'NT') {
        message.channel.send(`Livro: ${b.name}, Abreviação: ${b.abbrev.pt}`)
      }
    })
  }
  if (msg[0] === '!hbiblev' || msg[0] === '!helpbiblev') {
    booksBible.map(b => {
      if (b.testament === 'VT') {
        message.channel.send(`Livro: ${b.name}, Abreviação: ${b.abbrev.pt}`)
      }
    })
  }
  if (msg[0] === '!avatar') {
    message.reply(message.author.displayAvatarURL())
  }
  if (msg[0] === '!steam') {
    const dataAr = await gameSteam()
    dataAr.forEach(url => {
      const attachment = new MessageAttachment(url)
      message.channel.send(attachment)
    })
  }
  if (msg[0] === '!img') {
    if (msg.length === 2) {
      if (msg[1] === 'cosplay') {
        const attachment = new MessageAttachment('https://i.imgur.com/k66tplC.jpg')
        message.channel.send(attachment)
      } else {
        message.reply('sub-comando não encontrado')
      }
    } else {
      const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png')
      message.channel.send(`${message.author}, `, attachment)
    }
  }

  if (msg[0] === '!bible') {
    const response = await axios.get(`https://bibleapi.co/api/verses/nvi/${msg[1]}/${msg[2]}/${msg[3]}`)
    message.reply(`${response.data.book.name} ${response.data.chapter}:${response.data.number} \n ${response.data.text}`)
  }
})

client.login(process.env.DISC_TOKEN)
