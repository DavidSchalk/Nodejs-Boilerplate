
import { ErrorBadRequest } from "../../core/error.js";
import { validate, Joi } from "../../core/validator.js";
import { findUser } from "../connectors/database.js";

export default async (req) => {

    const params = validate(req,
        {
            params: Joi.object().keys({
                email: Joi.string().required(),
            }),
        }
    );

    const user = await findUser(params.params.email);

    if (!user) {
        throw new ErrorBadRequest('User does not exist');
    }

    return user;
}