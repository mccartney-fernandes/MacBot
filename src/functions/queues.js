const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid')

db.defaults({ queue: [] })
  .write()

const queues = (url, infoVideo) => {
  db.get('queue')
    .push({ id: shortid.generate(), url: url, title: infoVideo.title })
    .write()

  return db.getState()
}

module.exports = queues
