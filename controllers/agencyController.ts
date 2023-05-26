import Express from "express"
import mongoose from "mongoose"
import Agency from "../models/agencyModel"


/**
 * createAgency - Create a new Agency with information gotten from the request body
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the created data if positive or error message if fails
 * 
 */
export const createAgency = async(req: Express.Request, res:Express.Response, next:any)=>{

    const agency = req.body

    try {
    const newAgency = await Agency.create(agency)
    return next(
      res.status(201).json({
        status: "OK",
        data: newAgency,
      })
    );
  } catch (error) {
    return next(res.status(404).json({ error }));
  }
}


/**
 * getAgency - Get One Agency from the Database with a particular id
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getAgency = async(req: Express.Request, res:Express.Response, next:any)=>{
    const { id }  = req.params;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Agency Doesn't exist! Wrong id"})
    }
   
    const agency = await Agency.findById(id)

    if(!agency){
        return res.status(404).json({message: "Agency Doesn't exist! Not Found!"})
    }

    return next(
        res.status(201).json({
            status: "OK",
            data: agency,
        })
    )
};


/**
 * getAllAgencies - Get all Agencies from the Database and sort it from latest to oldest
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const getAllAgencies =async (req: Express.Request, res:Express.Response, next:any)=>{
   
    let page = Number(String(req.query.page)) - 1 || 0 ;
    const limit = Number(String((req.query.limit))) || 10;
    const search = req.query.search || "";

    const query = {
        agencyName: { $regex: search, $options: "i"}
    }

    const agencies = await Agency.find(query).sort({createdAt: -1})
                    .skip(page*limit)
                    .limit(limit);

    const result = await Agency.countDocuments(query)
    
    const response = {
        error: false,
        result,
        limit,
        page: page + 1,
        agencies
    }

    return next(
        res.status(200).json(response)
    )
    
};



/**
 * updateAgency - Update a particular Agency info with id gotten from request params
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return the fetched data if positive or error message if fails
 * 
 */
export const updateAgency = async(req: Express.Request, res:Express.Response, next:any)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Agency doesn't exist"
            })
        )
    }
    

    const agency = await Agency.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!agency){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Agency doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: agency
        })
    )
};

/**
 * deleteAgency - find an Agency by id and delete it from the database
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 * 
 * Return : return a positive message if successfull or error message if fails
 * 
 */
export const deleteAgency = async(req: Express.Request, res:Express.Response, next:any) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Agency doesn't exist"
            })
        )
    }

    const agency = await Agency.findOneAndDelete({_id: id})

    if(!agency){
        return next(
            res.status(404).json({
                status: "Not Found",
                message: "Agency doesn't exist"
            })
        )
    }

    return next(
        res.status(200).json({
            status: "OK",
            data: agency
        })
    )
};