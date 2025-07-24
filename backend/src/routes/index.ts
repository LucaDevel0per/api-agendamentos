import { Router } from "express";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Server On-line!"});
})

// Criar Users
router.post('/users', UserController.create);

// Login 
router.post('/sessions', SessionController.create)

// get minha infos
router.get('/me', isAuthenticated, UserController.show);


export default router