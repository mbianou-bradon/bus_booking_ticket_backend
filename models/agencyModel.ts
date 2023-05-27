import mongoose from "mongoose"

const agencyModel = new mongoose.Schema({
    agencyName : {
        type : String,
        required : [true, "Please Enter Agency Name"],
        unique : [true, "Agency Name Already in Use"]
    },
    agencyAbout : {
        type : String
    },
    trip : [
        {
            tripNumber : {
                type : Number
            },
            departureTime : {
                type: String
            },
            tripStart : {
                type : String
            },
            destination : {
                type: [String]
            },
            busSize: {
                type : Number
            },
            tripClass : {
                type : String
            }
        }
    ]
    
    
},{ timestamps : true});

const Agency = mongoose.model("Agency", agencyModel);

export default Agency;