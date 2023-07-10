import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { TaskDto, TaskSchemaDto } from "../dtos/task.dto";
import { GenerateResponse } from "../utils/response.creator";
import * as taskService from "../services/task.service";

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: TaskDto = { ...req.body };
    const _task: TaskSchemaDto = await taskService.CreateTask(dto);
    return GenerateResponse(res, 201, { _task }, "Task Created");
  } catch (error: any) {
    next(error);
  }
};

const FetchAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks: TaskSchemaDto[] = await taskService.FetchAllTasks();
    return GenerateResponse(res, 200, { tasks });
  } catch (error: any) {
    next(error);
  }
};

const FetchById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const task: TaskSchemaDto | null = await taskService.FetchTaskById(
      new Types.ObjectId(id)
    );
    if (!task) return GenerateResponse(res, 404);

    return GenerateResponse(res, 200, { task });
  } catch (error: any) {
    next(error);
  }
};

export { Create, FetchAll, FetchById };
