import Joi from 'joi';
import pick from '../core/utils/pick';
import { ErrorValidation } from './error';

const validate = (req, schema, code = null) => {
  const validSchemas = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchemas));

  const params = {};
  Object.keys(validSchemas).map(item => {
    const { value, error } = validSchemas[item].validate(object[item], { abortEarly: false });
    if (error) {
      throw new ErrorValidation(error.details.map(item =>  item.message.replace(new RegExp('"','g'),""), code));
    }
    
    params[item] = value;
  })

  return params;
};

export { validate, Joi };
