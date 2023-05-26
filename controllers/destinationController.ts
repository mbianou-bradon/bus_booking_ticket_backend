import Express from "express"
import Destination from "../models/destinationModel"
import mongoose from "mongoose";


/**
 * createDestination - Create a new destination with information gotten from the request body
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the created data if positive or error message if fails
 * 
 */
export const createDestination = async (req : Express.Request, res : Express.Response, next : any) => {
    const destinationDetails = req.body

    try {
        const newDestination = await Destination.create(destinationDetails);

        return next(
            res.status(200).json({
                status : "OK",
                data : newDestination
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
 * getUser - Get One Destination from the Database with a particular id
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getDestination = async(req: Express.Request, res:Express.Response, next:any)=>{
    const { id }  = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Destination Doesn't exist! Wrong id"})
    }
   
    const destination = await Destination.findById(id)

    if(!destination){
        return res.status(404).json({message: "Destination Doesn't exist! Not Found!"})
    }

    return next(
        res.status(201).json({
            status: "OK",
            data: destination,
        })
    )
};

/**
 * getAllDestinations - Get all Destinations from the Database and sort it from latest to oldest
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getAllDestinations = async(req : Express.Request, res: Express.Response, next : any) => {
    try {
        const allDestinations = await Destination.find({}).sort({ createdAt : -1 })

        return next(
            res.status(200).json({
                status : "OK",
                data : allDestinations
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
 * updateDestination - Update a particular destination info with id gotten from request params
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const updateDestination = async(req: Express.Request, res:Express.Response, next:any)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Invalid Destination ID"
            })
        )
    }
    

    const destination = await Destination.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!destination){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Destination doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: destination
        })
    )
};

/**
 * deleteDestination - find a Destination by id and delete it from the database
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return a positive message if successfull or error message if fails
 * 
 */
export const deleteDestination = async(req: Express.Request, res:Express.Response, next:any) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Destination doesn't exist"
            })
        )
    }

    const destination = await Destination.findOneAndDelete({_id: id})

    if(!destination){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Destination doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: destination
        })
    )
};