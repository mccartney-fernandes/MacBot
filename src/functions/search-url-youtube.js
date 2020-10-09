const queues = require('./queues')
const searchUrlYoutube = async (msg, message, ytdl, connection) => {
  if (msg[2].includes('youtu') || msg[2].includes('youtube')) {
    await message.channel.send(':mag:**Pesquisando**: `https:' + msg[2] + '`')

    const voiceChannel = message.member.voice.channel

    let urlFormat = true
    if (msg[2].split('v=').length === 1) {
      if (msg[2].split('.be/').length === 1) {
        urlFormat = false
      }
    }

    if (urlFormat) {
      voiceChannel.join().then(async connection => {
        const { playerResponse } = await ytdl.getInfo(`https:${msg[2]}`)
        const { videoDetails } = playerResponse

        const urlQueue = queues(`https:${msg[2]}`, videoDetails)
        console.log(urlQueue)
        const youtubeStream = await ytdl(`https:${msg[2]}`, {
          quality: 'highestaudio',
          highWaterMark: 1 << 25
        })

        const dispatcher = connection.play(youtubeStream)

        dispatcher.on('start', async () => {
          console.log(new Date().toLocaleTimeString())
          await message.channel.send(':loud_sound:**Play Música**: `' + videoDetails.title + ' - com duração de: ' + (videoDetails.lengthSeconds / 60).toFixed(2) + '`')
        })

        dispatcher.on('finish', async () => {
          console.log(new Date().toLocaleTimeString())
          await message.channel.send(`Stop Música: ${videoDetails.title}`)
        })

        dispatcher.on('error', console.error)
      })
    } else {
      await message.channel.send(':interrobang:**Erro URL PlayList**: `A url passada é uma PlayList`')
    }
  } else {
    await message.channel.send(':interrobang:**Erro URL**: `A url passada é invalida`')
  }
}

module.exports = searchUrlYoutube
