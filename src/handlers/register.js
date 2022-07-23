
import Response from "../../core/response.js";
import { validate, Joi } from "../../core/validator.js";
import { createUser } from "../connectors/database.js";

export default async (req) => {

    const params = validate(req,
        {
            body: Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
            }),
        }
    );


    const result = await createUser(params.body.firstname, params.body.lastname, params.body.email, params.body.password);
    

    return new Response.Created(result);
}