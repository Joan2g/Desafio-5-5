const express = require("express");
const app = express();
const router = require("./routes/index");
const {engine} = require("express-handlebars");

const productRoutes = require("./routes/index")

const msn = []
const arrProductos = []

const http = require ("http")
const port = process.env.PORT || 3005
const server = http.createServer(app)

app.set("views", "./views")
app.set("view engine", "hbs")

app.engine(
    "hbs",
    engine({
        extname: "hbs",
        layoutsDir: __dirname + "/views/layouts",
        defaultLayout: "index"
    })
)

app.use(express.json())

app.use(express.urlencoded())

app.use(express.static(__dirname+"/public"))

app.use("/api", router)

const { Server } = require("socket.io")
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("Usuario Conectado!")
    
    socket.emit("message_back", msn)
    socket.on("message_client", (data) => {
        console.log(data)
    })

    socket.on("data_client", (data) => {
        console.log(data)

        msn.push(data)
        io.sockets.emit("message_back", msn)
        
    })

    socket.emit("message_back2", arrProductos)
    socket.on("data_client2", (data) => {
        arrProductos.push(data) 
        io.sockets.emit("message_back2", arrProductos)
    })
})

server.listen(port, () => {
    console.log("Server run on port " + port)
})