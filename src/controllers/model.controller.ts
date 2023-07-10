import { NextFunction, Request, Response } from "express";
import { ModelInputDto } from "../dtos/model.dto";
import { spawnSync } from "child_process";
import { GenerateResponse } from "../utils/response.creator";

const Predict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: ModelInputDto = { ...req.body };
    let output = "";

    let script = spawnSync(
      "python",
      [
        "scripts/script.py",
        dto.engine,
        dto.cylinder,
        dto.city,
        dto.highway,
        dto.combination,
        dto.combination_mpg,
        dto.make,
        dto.vehicle,
        dto.transmission,
        dto.fuel,
      ],
      { encoding: "utf-8" }
    );

    output = script.stdout.split(/\r?\n/)[0].slice(1, -1);
    // console.log(script.stdout, script.stderr);

    return GenerateResponse(res, 200, { output }, "Model ran successfully");
  } catch (error) {
    next(error);
  }
};

export { Predict };
