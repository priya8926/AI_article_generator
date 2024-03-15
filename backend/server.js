require('dotenv').config()
const express = require("express")
const app = express();
const cors = require("cors")
const FormRoute = require("./Route/FormRoute");
const adminRoute = require("./Route/AdminRoute")
const contactRoute = require("./Route/ContactRoute")

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET , POST , PUT , DELETE , PATCH , HEAD",
    credential: true

}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectdb = require("./Database/Db");

app.use("/api", FormRoute)
app.use("/api/admin",adminRoute)
app.use("/api/form" , contactRoute)

app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.Key_Id }))
const PORT = 8083

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listing  on port ${PORT}`)
    })
})
