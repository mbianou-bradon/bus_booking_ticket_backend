import Express from "express"
import { getAllAgencies, getAgency, createAgency, updateAgency, deleteAgency } from "../controllers/agencyController"

const router = Express.Router()

// Get all agency from Database
router.get("/", getAllAgencies)

// Get a agency User 
router.get("/:id", getAgency)

// Create a New agency 
router.post("/", createAgency)

// Update a agency
router.patch("/:id", updateAgency)

// Delete a agency
router.delete("/:id", deleteAgency)

export default router;