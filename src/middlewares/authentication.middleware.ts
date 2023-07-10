/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from "express";
import { GenerateResponse } from "../utils/response.creator";
import * as userService from "../services/user.service";
import { UserSchemaDto } from "../dtos/user.dto";
import jwt from "jsonwebtoken";

const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization?.split(" ")[1];
        if (!authToken)
            return GenerateResponse(res, 401, {}, "Token not found");

        // verifying the auth token received using jwt.
        const decoded = jwt.verify(authToken, String(process.env.JWT_SECRET_KEY)) as UserSchemaDto;

        // find the user with the received id & assign to req.body.user.
        const user = await userService.findUser(decoded.id);
        res.locals.user = user;

        next();
    } catch (error: any) {
        return GenerateResponse(res, 401, {}, "Expired or Invalid Token");
    }
};

export default Auth;
