import Express from "express"
import User from "../models/userModel"
import mongoose from "mongoose";

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

// Get a new User
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

// Update a User
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

// Delete an User
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