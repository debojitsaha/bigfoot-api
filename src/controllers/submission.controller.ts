import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { SubmissionDto, SubmissionSchemaDto } from "../dtos/submission.dto";
import { GenerateResponse } from "../utils/response.creator";
import * as submissionService from "../services/submission.service";

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: SubmissionDto = { ...req.body };
    if (req.file && req.file.path) dto.file = String(req.file?.path);
    dto.dateOfCompletion = new Date();
    const _submission: SubmissionSchemaDto =
      await submissionService.CreateSubmission(dto);
    return GenerateResponse(
      res,
      201,
      { _submission },
      "Your Task is successfully submitted"
    );
  } catch (error: any) {
    next(error);
  }
};

const FetchAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.query.user;
    let submissions: SubmissionSchemaDto[] = [];
    if (user)
      submissions = await submissionService.FetchAllSubmissions(
        new Types.ObjectId(String(user))
      );
    else submissions = await submissionService.FetchAllSubmissions();
    return GenerateResponse(res, 200, { submissions });
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
    const submission: SubmissionSchemaDto | null =
      await submissionService.FetchSubmissionById(new Types.ObjectId(id));
    if (!submission) return GenerateResponse(res, 404);

    return GenerateResponse(res, 200, { submission });
  } catch (error: any) {
    next(error);
  }
};

export { Create, FetchAll, FetchById };
