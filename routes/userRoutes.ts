import Express from "express"
import { createUser, deleteUser, getAllUsers, getUser, getUserByPhoneNumber, updateUser } from "../controllers/userController";

const router = Express.Router();

// Get all users from Database
router.get("/", getAllUsers)

// Get a Single User 
router.get("/:id", getUser)

// Get a Single User by phone number
router.get("/phone/:phoneNumber", getUserByPhoneNumber);

// Create a New User 
router.post("/", createUser)

// Update a User
router.patch("/:id", updateUser)

// Delete a User
router.delete("/:id", deleteUser)

export default router;