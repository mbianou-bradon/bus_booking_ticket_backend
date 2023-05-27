import Express from "express"
import { getTicket, createTicket, updateTicket, deleteTicket, getAllTicket } from "../controllers/ticketController";

const router = Express.Router();

// Get all Tickets from Database
router.get("/", getAllTicket)

// Get a Single Ticket from Database 
router.get("/:id", getTicket)

// Create a New Ticket 
router.post("/", createTicket)

// Update a Ticket
router.patch("/:id", updateTicket)

// Delete a Ticket
router.delete("/:id", deleteTicket)

export default router;