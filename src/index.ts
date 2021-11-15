import express, { Response, Request } from "express"
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
  /* options */
})

app.get("/", (req: Request, res: Response) => {
  const day = dayjs()
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MMMM/YYYY hh:mm:ss")
  res.send(`🙏 : ${day}`)
})

io.on("connection", (socket: Socket) => {
  // ...
  console.log("😊 Use conenct")
})

httpServer.listen(2000, () => {
  //   const day = dayjs().locale("th").format("DD/MMMM/YYYY HH:MM:ss")
  const day = dayjs()
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MMMM/YYYY hh:mm:ss")
  console.log("🎉 Server is up. :", day)
})
