const { Server } = require('socket.io')
// const { getChatResponse: gcr } = require('./chatgpt')
const pg = require('./pgService')

// const initHelper = async (user_id, callback) => {
//   let chats = await pg.exec('any', 'SELECT * FROM chats WHERE user_id = $1', [user_id])
//   callback(chats)
// }

// const trimAll = (s) => s && s.replaceAll ? s.replaceAll(' ', '').replaceAll('*', '').replaceAll('-', '').replaceAll('#', '').replaceAll(':', '').replaceAll('：', '') : s || ''

// const models = {}

const socket = {}
socket.init = (server, setting) => {
  const io = new Server(server, setting)
  io.on('connection', (socket) => {
    const id = socket.handshake.auth.auth
    socket.join(id)
  })
  socket.io = io
}

module.exports = socket
