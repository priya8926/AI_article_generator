const express = require("express")
const app = express();
const cors = require("cors")

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET , POST , PUT , DELETE , PATCH , HEAD",
    credential: true

}
app.use(cors(corsOptions))
app.use(express.json())

const FormRoute = require("./Route/FormRoute");
const connectdb = require("./Database/Db");

app.use("/api", FormRoute)
const PORT = 8083

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listing  on port ${PORT}`)
    })
})