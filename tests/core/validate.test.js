/* eslint-disable no-undef */
import {validate, Joi} from '../../core/validator.js';

test("Validator return the correct object after validating",() => {


    const req = {
        body: {
            test: 'test'
        },
        params: {
            test: 'test'
        },
        query: {
            test: 'test'
        }
    };

    const params = validate(req,
        {
            body: Joi.object().keys({
                test: Joi.string().required(),
            }),
            params: Joi.object().keys({
                test: Joi.string().required(),
            }),
            query: Joi.object().keys({
                test: Joi.string().required(),
            }),
        }
    );

    expect(params).toEqual(req);
 })


test("Validator errors when a required field is missing",() => {

    try {
        const req = {
            body: {
                test: 'test'
            },
            params: {
                test: 'test'
            }
        };

        const params = validate(req,
            {
                body: Joi.object().keys({
                    test: Joi.string().required(),
                }),
                params: Joi.object().keys({
                    test: Joi.string().required(),
                }),
                query: Joi.object().keys({
                    test: Joi.string().required(),
                }),
            }
        );

        console.log(params);

    } catch (error) {

        expect(error.statusCode).toBe(400);
        expect(error.data.message).toBe('Validation failed, ensure all fields are correct.');
        expect(error.data.fields).toEqual(["test is required"]);
        
    }
})

test("Validator errors when a extra fields are added",() => {

    try {
        const req = {
            body: {
                test: 'test',
                extra: 'extra'
            },
            params: {
                test: 'test'
            },
            query: {
                test: 'test'
            }
        };

        const params = validate(req,
            {
                body: Joi.object().keys({
                    test: Joi.string().required(),
                }),
                params: Joi.object().keys({
                    test: Joi.string().required(),
                }),
                query: Joi.object().keys({
                    test: Joi.string().required(),
                }),
            }
        );

        console.log(params);

    } catch (error) {

        expect(error.statusCode).toBe(400);
        expect(error.data.message).toBe('Validation failed, ensure all fields are correct.');
        expect(error.data.fields).toEqual(["extra is not allowed"]);
        
    }
})