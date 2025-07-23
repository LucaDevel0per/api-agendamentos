import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Server On-line!"});
})

router.post('/users', UserController.create);

export default router