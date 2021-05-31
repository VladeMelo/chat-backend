const Koa = require('koa') // lida com requisições
const http = require('http') // sobe o servidor e fica escutando as requisições
const socket = require('socket.io') // abre a conexão socket e fica escutando o servidor

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_PORT = 8080

io.on('connection', socket => {
    console.log('Server has a new connection')

    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })

    socket.on('disconnect', () => {
        console.log('A connection was disconnected')
    })
})

server.listen(SERVER_PORT, () => {
    console.log(`Server ON -> Port: ${SERVER_PORT}`)
})