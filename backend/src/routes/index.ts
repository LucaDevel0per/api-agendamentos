import { Router } from "express";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Server On-line!"});
})

// Criar Users
router.post('/users', UserController.create);

// Login 
router.post('/sessions', SessionController.create)

export default router