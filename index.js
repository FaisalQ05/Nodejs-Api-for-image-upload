require("dotenv").config()
require("express-async-errors")
const express = require("express")
const userRoute = require("./route/userRoute")
const { errorHandler } = require("./middlerware/errorHandler")
const app = express()

const PORT = process.env.PORT || 4000

app.use("/api/user", userRoute)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`)
})
