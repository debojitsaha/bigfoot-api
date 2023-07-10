import { Router } from "express";
import { Pay } from "../controllers/solana.controller";

const solanaRouter: Router = Router();

solanaRouter.post("/pay", Pay)

export { solanaRouter };
