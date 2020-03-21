const axios = require('axios')
const helpBot = require('../database/comandHelp')
const { webScrapBible } = require('../web-scraping')
const booksBible = require('../database/bibleBooks')

module.exports = async (client, message, msg, MessageAttachment) => {
  if (msg[0] === 'ping') {
    const msg = await message.channel.send('Ping?')
    msg.edit(`Pong! A Latência é ${msg.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ping)}ms`)
  }

  if (msg[0] === '!h' || msg[0] === '!help') {
    message.channel.send(helpBot)
  }
  if (msg[0] === '!hb' || msg[0] === '!helpb') {
    booksBible.map(b => message.channel.send(`Livro: ${b.name} possui ${b.chapters} capítulos, Abreviação: ${b.abbrev.pt}`))
  }
  if (msg[0] === '!hbn' || msg[0] === '!helpbn') {
    const lvb = await booksBible.map(b => {
      if (b.testament === 'NT') {
        return `Livro: ${b.name} possui ${b.chapters} capítulos, Abreviação: ${b.abbrev.pt}`
      }
    })
    message.channel.send(lvb)
  }
  if (msg[0] === '!hbv' || msg[0] === '!helpbv') {
    const lvb = await booksBible.map(b => {
      if (b.testament === 'VT') {
        return `Livro: ${b.name} possui ${b.chapters} capítulos, Abreviação: ${b.abbrev.pt}`
      }
    })
    message.channel.send(lvb)
  }
  if (msg[0] === '!avatar') {
    message.reply(message.author.displayAvatarURL())
  }
  if (msg[0] === '!steam') {
    const dataAr = await webScrapBible()
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

  if (msg[0] === '!b') {
    const response = await axios.get(`https://bibleapi.co/api/verses/nvi/${msg[1]}/${msg[2]}/${msg[3]}`)
    message.reply(`${response.data.book.name} ${response.data.chapter}:${response.data.number} \n ${response.data.text}`)
  }
}
