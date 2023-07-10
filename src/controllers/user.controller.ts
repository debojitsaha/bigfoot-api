import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDto } from "../dtos/user.dto";
import * as userService from "../services/user.service";
import { GenerateResponse } from "../utils/response.creator";

const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserDto = { ...req.body };

    const result = await userService.createUser(user);

    const jwtPayLoad = { id: result._id };
    const authToken = jwt.sign(jwtPayLoad, String(process.env.JWT_SECRET_KEY), {
      expiresIn: "2d",
    });

    return GenerateResponse(res, 201, { authToken }, "Login Successful");
  } catch (error) {
    next(error);
  }
};

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials: UserDto = { ...req.body };

    const user = await userService.fetchUserByEmail(credentials.email);

    if (!user) return GenerateResponse(res, 400, {}, "Invalid email");

    const passwordMatched = await bcrypt.compare(
      credentials.password,
      String(user.password)
    );
    if (!passwordMatched)
      return GenerateResponse(res, 400, {}, "Incorrect password");

    const jwtPayLoad = { id: user._id };
    const authToken = jwt.sign(jwtPayLoad, String(process.env.JWT_SECRET_KEY), {
      expiresIn: "2d",
    });

    return GenerateResponse(res, 201, { authToken }, "Login Successful");
  } catch (error) {
    next(error);
  }
};

const FetchContributedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.fetchContributingUsers();
    return GenerateResponse(res, 201, { users }, "Users fetched successfully.");
  } catch (error) {
    next(error);
  }
};

const FetchAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return GenerateResponse(
      res,
      201,
      { user: res.locals.user },
      "Users fetched successfully."
    );
  } catch (error) {
    next(error);
  }
};

export { CreateUser, LoginUser, FetchContributedUsers, FetchAuthenticatedUser };
