
import { ErrorBadRequest } from "../../core/error.js";
import { validate, Joi } from "../../core/validator.js";
import {generateAccessToken, generateRefreshToken} from '../../core/security/jwt.js';
import { findUser } from "../connectors/database.js";
import User from "../models/User.js";
export default async (req) => {

    const params = validate(req,
        {
            body: Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }
    );

    // Validate the email and password.
    const user = await findUser(params.body.email);

    if (!user) {
        throw new ErrorBadRequest('User does not exist');
    }

    // Check if the password is correct.
    if (user.password !== params.body.password) {
        throw new ErrorBadRequest('Password is incorrect');
    }

    const parsedUser =  User.parse(user);

    console.log(parsedUser)

    // Generate a jwt token.
    const acessToken = generateAccessToken(parsedUser, ['user']);
    const refreshToken = generateRefreshToken({
        email: params.body.email,
    });

    return {
        user: parsedUser,
        tokens: {
            access: acessToken,
            refresh: refreshToken,
        }
    };
}