import { Request, Response, Router } from "express";
import { GenerateResponse } from "../utils/response.creator";
import userRouter from "./user.route";
import { modelRouter } from "./model.route";
import { solanaRouter } from "./solana.route";
import { taskRouter } from "./task.route";
import { submissionRouter } from "./submission.route";

const mainRouter: Router = Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/tasks', taskRouter);
mainRouter.use('/submissions', submissionRouter);
mainRouter.use('/model', modelRouter);
mainRouter.use('/solana', solanaRouter);

mainRouter.use((req: Request, res: Response) => {
    GenerateResponse(res, 404);
});

export { mainRouter };
