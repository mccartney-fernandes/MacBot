const searchUrlYoutube = async (msg, message, ytdl, connection) => {
  if (msg[2].includes('youtu') || msg[2].includes('youtube')) {
    await message.channel.send(':mag:**Pesquisando**: `https:' + msg[2] + '`')
    let urlFormat = true
    if (msg[2].split('v=').length === 1) {
      if (msg[2].split('.be/').length === 1) {
        urlFormat = false
      }
    }
    console.log(urlFormat)
    if (urlFormat) {
      ytdl.getInfo(`https:${msg[2]}`, async (err, info) => {
        if (err) throw err

        const youtubeStream = await ytdl(`https:${msg[2]}`)
        const dispatcher = connection.play(youtubeStream, { type: 'opus' })

        dispatcher.on('start', async () => {
          await message.channel.send(':loud_sound:**Play Música**: `' + info.title + ' - com duração de: ' + (info.length_seconds / 60).toFixed(2) + '`')
          if (info.related_videos) {
            await message.channel.send(':arrows_counterclockwise:**Videos relacionados**')
          // for (const related of info.related_videos) {
          //   await message.channel.send(':movie_camera:: `' + related.title + ', URL: https://www.youtube.com/watch?v=' + related.id + '`')
          // }
          }
        })

        dispatcher.on('finish', async () => {
          await message.channel.send(`Stop Música: ${info.title}`)
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
