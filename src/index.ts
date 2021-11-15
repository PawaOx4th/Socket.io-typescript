import express, { Response, Request } from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  /* options */
})

app.get("/", (req: Request, res: Response) => {
  res.send("🙏")
})

io.on("connection", (socket) => {
  // ...
})

httpServer.listen(2000, () => {
  console.log("🎉 Server is up.")
})
