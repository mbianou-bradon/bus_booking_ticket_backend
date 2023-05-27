import Express from "express"
import User from "../models/userModel"
import mongoose from "mongoose";


/**
 * createUser - Create a new user with information gotten from the request body
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the created data if positive or error message if fails
 * 
 */
export const createUser = async (req : Express.Request, res : Express.Response, next : any) => {
    const userDetails = req.body

    try {
        const newUser = await User.create(userDetails);

        return next(
            res.status(200).json({
                status : "OK",
                data : newUser
            })
        )
    } catch(error) {
        return next(
            res.status(404).json({
                message : `An Error Occured : ${error}`
            })
        )
    }
}

/**
 * getUser - Get One User from the Database with a particular id
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getUser = async(req: Express.Request, res:Express.Response, next:any)=>{
    const { id }  = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "User Doesn't exist! Wrong id"})
    }
   
    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({message: "User Doesn't exist! Not Found!"})
    }

    return next(
        res.status(201).json({
            status: "OK",
            data: user,
        })
    )
};

/**
 * getUserByPhoneNumber - Get One User from the Database with a particular id
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getUserByPhoneNumber = async(req: Express.Request, res:Express.Response, next:any)=>{
    const { phoneNumber }  = req.params;
   
    const user = await User.findOne({ phoneNumber : phoneNumber })

    if(!user){
        return res.status(404).json({message: "User Doesn't exist! Not Found!"})
    }

    return next(
        res.status(201).json({
            status: "OK",
            data: user,
        })
    )
};

/**
 * getAllUsers - Get all Users from the Database and sort it from latest to oldest
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getAllUsers = async(req : Express.Request, res: Express.Response, next : any) => {
    try {
        const allUsers = await User.find({}).sort({ createdAt : -1 })

        return next(
            res.status(200).json({
                status : "OK",
                data : allUsers
            })
        )
    } catch(error) {
        return next (
            res.status(404).json({
                message : `An Error Occurred ${error}`
            })
        )
    }
}

/**
 * updateUser - Update a particular User info with id gotten from request params
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const updateUser = async(req: Express.Request, res:Express.Response, next:any)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Invalid User ID"
            })
        )
    }
    

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "User doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: user
        })
    )
};

/**
 * deleteUser - find a User by id and delete it from the database
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return a positive message if successfull or error message if fails
 * 
 */
export const deleteUser = async(req: Express.Request, res:Express.Response, next:any) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "User doesn't exist"
            })
        )
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "User doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: user
        })
    )
};