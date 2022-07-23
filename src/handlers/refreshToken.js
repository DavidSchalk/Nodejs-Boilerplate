
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../core/security/jwt.js";
import { validate, Joi } from "../../core/validator.js";
import { createUser, findUser } from "../connectors/database.js";

export default async(req) => {

    const params = validate(req,
        {
            body: Joi.object().keys({
                refreshToken: Joi.string().required(),
            }),
        }
    );

    const data = verifyRefreshToken(params.body.refreshToken);

    const user = await findUser(data.email);

    // Generate a jwt token.
    const acessToken = generateAccessToken(user, ['user']);
    const refreshToken = generateRefreshToken({
        email: data.email,
    });

    return {
        tokens: {
            access: acessToken,
            refresh: refreshToken,
        }
    };
}