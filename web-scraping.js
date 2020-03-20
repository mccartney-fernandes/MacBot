const axios = require('axios')
const cheerio = require('cheerio')

const webScrap = async (message) => {
  const dataArray = []
  try {
    const { data } = await axios.get('https://store.steampowered.com/?l=portuguese')
    const $ = cheerio.load(data)

    $('.spotlight_img').each((i, item) => {
      dataArray.push($(item).find('a img').attr('src'))
    })
    return dataArray
  } catch (error) {
    console.log(error)
  }
}

module.exports = webScrap
