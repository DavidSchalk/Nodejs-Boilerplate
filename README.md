# Nodejs-Boilerplate
A simple node-js boilerplate to start a project.


# Setup
1. Clone the repo
2. Run npm install

# Running of the project
# On vscode
Press f5 to enable debugger and running of the main js file.

# No vscode
npm run start

# Running of test
TODO: npm run test

# How does it work?

## 1. Openapi
This is used to register your routes, thus keeping the routes in the openapi file up to date.
Documents is available on http://localhost:3000/ or if you specified a different port just replace the port.

### 3.Custom openapi keys to get it to work.
x-handler -> The path to your the first function to execute. If not specified the route will not be registered.
x-noauth -> If you want the api endpoint to disable the check for a valid jwt token. ex. true | false defaults to false.
x-roles -> If you want to lock the api down to only specific roles... ex. ['user', 'admin']

## 2. File -> core/error
Specifiy error that will be used throughout the project.

## 3. File -> core/logger
Specify your different types of logs and use the functions to write to your favourite loging application.
default: warn, info, error, api

Api is currently writing the logs to the console captured in the core/routing/router file.

## 4. File -> core/response
Specify different server responses if you just return a object from your handeler function it will default to status code 200
ex. new Response.Created({}) -> 201
ex. new Response.NoContent() - 204

## 5.File -> core/config
Configure your environement variables that will be used through out the project in a nice json structure.

## 6.File -> core/validator
Use the validator function in conjunction with Joi npm package to validate your inputs received.
example

import { validate, Joi } from "../../core/validator.js";
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

## File -> core/security/jwt
Use this functions to generate jwt tokens defaults available is access , refresh you can always add extras as needed.
example
import {generateAccessToken, generateRefreshToken} from '../../core/security/jwt.js';

const acessToken = generateAccessToken(user, ['user']);
const refreshToken = generateRefreshToken({
    email: params.body.email,
});

note: The access token will automatically be validate in the core/routing/route function when a api is called.


# In your source folder.
You can use this to house the logic of your applicating. In this example I have two sub folders change as it makes sense for your project.
handlers/ -> The first layer for your logic, usually used for validation, handling some logic and returning a result.
connectors/ -> This can be used for things like database | api's.