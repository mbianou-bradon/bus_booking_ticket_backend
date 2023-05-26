import mongoose from "mongoose"

const destinationSchema = new mongoose.Schema({
    destinationName: {
        type : String
    },
    timeSlot : {
        dayTime: {
            type: Boolean
        },
        nightTime : {
            type : Boolean
        }
    }
})

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;