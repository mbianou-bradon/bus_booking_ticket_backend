import Express from "express"
import Ticket from "../models/userModel"
import mongoose from "mongoose";


/**
 * createTicket - Create a new document with information gotten from the request body
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the created data if positive or error message if fails
 * 
 */
export const createTicket = async (req : Express.Request, res : Express.Response, next : any) => {
    const ticketDetails = req.body

    try {
        const newTicket = await Ticket.create(ticketDetails);

        return next(
            res.status(200).json({
                status : "OK",
                data : newTicket
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
 * getTicket - Get One Tickets from the Database with a particular id
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getTicket = async(req: Express.Request, res:Express.Response, next:any)=>{
    const { id }  = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Ticket Doesn't exist! Wrong id"})
    }
   
    const ticket = await Ticket.findById(id)
    .populate([{ path: "user", select: "-createdAt, -updatedAt -email -phoneNumber"}, { path: "agency", select: "-createdAt -updatedAt"}])

    if(!ticket){
        return res.status(404).json({message: "Ticket Doesn't exist! Not Found!"})
    }

    return next(
        res.status(201).json({
            status: "OK",
            data: ticket,
        })
    )
};

/**
 * getAllTicket - Get all Tickets from the Database and sort it from latest to oldest
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */ 
export const getAllTicket = async (req: Express.Request, res: Express.Response, next:any) => {

    try {
        const allTickets = await Ticket.find({}).sort({ createdAt : -1 })
        .populate([{ path: "User", select: "-createdAt, -updatedAt -email -phoneNumber"}, { path: "Agency", select: "-createdAt -updatedAt"}])

        return next(
            res.status(200).json({
                status : "OK",
                data : allTickets
            })
        )
    }
    catch (error) {
        return next(
            res.status(404).json({
                message : `An Error Occured: ${error}`
            })
        )
    }
    
}

/**
 * updateTicket - Update a particular ticket with id gotten from request params
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const updateTicket = async(req: Express.Request, res:Express.Response, next:any)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Invalid Ticket ID"
            })
        )
    }
    

    const ticket = await Ticket.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!ticket){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Ticket doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: ticket
        })
    )
};

/**
 * deleteTicket - find a ticket by id and delete it from the database
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return a positive message if successfull or error message if fails
 * 
 */
export const deleteTicket = async(req: Express.Request, res:Express.Response, next:any) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Ticket doesn't exist"
            })
        )
    }

    const ticket = await Ticket.findOneAndDelete({_id: id})

    if(!ticket){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Ticket doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: ticket
        })
    )
};