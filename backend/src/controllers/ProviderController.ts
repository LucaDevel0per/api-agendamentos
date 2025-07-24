import { Request, Response } from "express";
import ListProvidersService from "../services/ListProvidersService";

class ProviderController {
    public async list(req: Request, res: Response): Promise<Response> {
        const listProviders = new ListProvidersService();

        const providers = await listProviders.execute()

        return res.status(200).json(providers)
    }
}

export default new ProviderController;