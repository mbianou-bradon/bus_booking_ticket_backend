import mongoose from "mongoose"

const agencyModel = new mongoose.Schema({
    agencyName : {
        type : String,
        required : [true, "Please Enter Agency Name"],
        unique : [true, "Agency Name Already in Use"]
    },
    destination : {
        type: [String]
    },
    busNumber : {
        type: Number
    }
},{ timestamps : true});

const Agency = mongoose.model("Agency", agencyModel);

export default Agency;