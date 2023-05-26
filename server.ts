import Express from "express"
import mongoose from "mongoose"
import agencyRoutes from "./routes/agencyRoutes";
import destinationRoutes from "./routes/destinationRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import userRoutes from "./routes/userRoutes";
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: "./vars/.env"})
}

const app = Express();

const PORT = process.env.PORT;
const DB_URI : string = process.env.MONGODB_URI!

// Connect To MongoDB database, then Listen to the App
mongoose.connect(DB_URI)
.then(()=> {
    app.listen(PORT, ()=>{
        console.log("Listening at port", PORT);
    })

    console.log("Successfully Connected to the Database");
})
.catch(error => {
    console.log("Database Error: ",error);
})

// MiddleWares
app.use(Express.json());
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
});

// Routes 
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/agencies", agencyRoutes);
app.use("/api/destinations", destinationRoutes);

