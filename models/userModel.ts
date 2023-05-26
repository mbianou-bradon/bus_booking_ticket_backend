import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required : [true, "Please Enter Username"]
    },
    email : {
        type : String,
    },
    phoneNumber : {
        type : String,
        required : [true, "Please Enter User Phone Number"],
        unique : [true, "Phone Number Already in Use"]
    }
},{ timestamps : true });

const User = mongoose.model("User", userSchema);

export default User;