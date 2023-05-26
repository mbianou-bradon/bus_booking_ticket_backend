import Express from "express"
import Ticket from "../models/userModel"
import mongoose from "mongoose";

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

// Get a single Ticket
export const getTicket = async(req: Express.Request, res:Express.Response, next:any)=>{
    const { id }  = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Ticket Doesn't exist! Wrong id"})
    }
   
    const ticket = await Ticket.findById(id)

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

// Update a Ticket
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

// Delete a Ticket
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