import express, { Response, Request } from "express"
import cors from "cors"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import dayjs from "dayjs"
import "dayjs/locale/th"
import utc from "dayjs/plugin/utc"
import timezome from "dayjs/plugin/timezone"
import { v4 as uuidv4 } from "uuid"
import { ROOM_NAME, TMessageRoom1 } from "./type"

dayjs.extend(utc)
dayjs.extend(timezome)

function timeStemp() {
  return dayjs().tz("Asia/Bangkok").locale("th").format("DD/MMMM/YYYY HH:mm:ss")
}

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
})

app.use(cors())

app.get("/", (req: Request, res: Response) => {
  const day = dayjs()
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MMMM/YYYY hh:mm:ss")
  res.send(`🙏 : ${day}`)
})

io.on("connection", (socket: Socket) => {
  // ...
  //   console.log(`🔥 User join : ${socket.id} ${timeStemp()}`)
  //   socket.emit("connection", socket.id)

  //   socket.on("TEST", (msg: string) => {
  //     const fromDate = {
  //       msgID: uuidv4(),
  //       time: dayjs().unix(),
  //       content: ` 🚨 FROM SERVER : ${msg}`
  //     }
  //     // socket.emit("TEST", fromDate)
  //     io.emit("TEST", fromDate)
  //   })

  //   socket.on("room1", (msg: TMessageRoom1) => {
  //     // socket.emit("room1", msg)
  //     io.emit("room1", msg)
  //     // socket.join("/open1")
  //   })

  //   socket.on("room2", (msg: string) => {
  //     console.log("🦁 MSG :", msg)
  //     io.emit("xxx")
  //   })

  io.of("/open1").in("")
})

io.of("/open1").on("connection", (socket: Socket) => {
  console.log("🦁 WELLCOMWE :")

  socket.emit("open1", "From Server.")

  socket.on("open1", (msg: string) => {
    console.log("🦁 OPEN1 msg :", msg)
    io.of("/open1").emit("open1", msg)
  })
})

httpServer.listen(2000, () => {
  //   const day = dayjs().locale("th").format("DD/MMMM/YYYY HH:MM:ss")
  const day = dayjs()
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MMMM/YYYY hh:mm:ss")
  console.log("🎉 Server is up. :", day)
})
