import { Router } from "express";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import ServiceController from "../controllers/ServiceController";
import ProviderController from "../controllers/ProviderController";
import AppointmentController from "../controllers/AppointmentController";


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

// criar service
router.post('/services', isAuthenticated, ServiceController.create)

// get providers - user NÃO autenticados podem ver os profissionais disponiveis
router.get('/providers', ProviderController.list)


router.get('/providers/:providerId/availability', ProviderController.availability)

router.post('/appointments', isAuthenticated, AppointmentController.create)

export default router