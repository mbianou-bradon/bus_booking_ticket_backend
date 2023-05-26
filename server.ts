import Express from "express"

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: "./vars/.env"})
}

const app = Express();

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Listening at port", PORT);
})