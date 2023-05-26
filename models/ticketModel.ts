import mongoose from "mongoose"
import User from "./userModel"
import Agency from "./agencyModel"

const ticketSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : User,
        required : [true, "User ID is Required!"]
    },
    agency : {
        type: mongoose.Schema.Types.ObjectId,
        ref : Agency,
        required : [true, "User ID is Required!"]
    },
    timeOfDeparture : {
        type : String,
        required: [true, "Time of Departure Required!"]
    },
    totalPayment : {
        type : String,
        required : [true, "Total Amount Required!"]
    },
    destination : {
        type : String, 
        required : [true, "User Destination Required!"]
    }
}, { timestamps : true });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;