import Express from "express"
import { getAllDestinations, getDestination, createDestination, updateDestination, deleteDestination } from "../controllers/destinationController";

const router = Express.Router();

// Get all destinations from Database
router.get("/", getAllDestinations)

// Get a Single Destination 
router.get("/:id", getDestination)

// Create a New Destination 
router.post("/:id", createDestination)

// Update a Destionation
router.patch("/:id", updateDestination)

// Delete a Destination
router.delete("/:id", deleteDestination)

export default router;