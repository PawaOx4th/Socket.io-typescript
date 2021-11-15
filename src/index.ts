import express, { Response, Request } from "express"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import datjs from "dayjs"
import "dayjs/locale/th"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  /* options */
})

app.get("/", (req: Request, res: Response) => {
  const day = datjs().locale("th").format("DD/MMMM/YYYY HH:MM")
  res.send(`🙏 : ${day}`)
})

io.on("connection", (socket: Socket) => {
  // ...
})

httpServer.listen(2000, () => {
  const day = datjs().locale("th").format("DD/MMMM/YYYY HH:MM:ss")
  console.log("🎉 Server is up. :", day)
})
