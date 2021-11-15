import express, { Response, Request } from "express"
import cors from "cors"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import dayjs from "dayjs"
import "dayjs/locale/th"
import utc from "dayjs/plugin/utc"
import timezome from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezome)

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
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
  console.log("😊 Use conenct :", socket.id)
})

httpServer.listen(2000, () => {
  //   const day = dayjs().locale("th").format("DD/MMMM/YYYY HH:MM:ss")
  const day = dayjs()
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MMMM/YYYY hh:mm:ss")
  console.log("🎉 Server is up. :", day)
})
