const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static(__dirname+'/public'))

app.get("/", (req, res) => {
    console.log("Server is running")
    res.render("index")
})

const profilesRoutes = require('./routes/profiles');
app.use('/profiles', profilesRoutes)

app.listen(3000)