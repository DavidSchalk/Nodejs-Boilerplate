import YAML from 'yamljs';
import fs from 'fs';
import process from 'process';
import { verifyAccessToken } from '../security/jwt';
import { validateRole } from '../security/auth';
import logger from '../logger';

import {ServerResponse} from '../response';

export default (router) => {
    // Convert yaml to readble json.
    const openapi = YAML.load('./openapi.yml');
    const paths = openapi.paths;

    console.log('---------------------------------')
    console.log('       Registering Routes        ')
    console.log('---------------------------------')

    Object.keys(paths).map(path => {
        const pathToRegister = path.replace(new RegExp('{', 'g'), ':').replace(new RegExp('}', 'g'), '');
        const methods = paths[path];
        Object.keys(methods).map(method => {
            // Check if the handler file exists.
            const fileExists = fs.existsSync(`${process.cwd()}/src${methods[method]['x-handler']}`)
            if (!fileExists) {
                console.log(`The following file does not exists. - /src${methods[method]['x-handler']}`);
                return;
            }
            
            // Check for the roles and the noauth flag.
            const noAuth = methods[method]['x-noauth'] || false;
            const roles = methods[method]['x-roles'] || [];

            // File exists - let's register the route.
            router[method.toLowerCase()](pathToRegister,  async (req, res) => {
                // Set the incomming time for the log.
                const incommingTime = new Date();
                try {

                    // Check if the user is logged in.
                    if(!noAuth) {
                        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

                        // Check the token validation
                        const decodedToken = verifyAccessToken(token);

                        // Check the roles if specified
                        const decoded = await validateRole(decodedToken, roles);

                        // Set the token to the request auth.
                        req.auth = decoded;
                    }

                    // Execute the handler error.
                    const handler = await import(`../../src/${methods[method]['x-handler']}`)
                    const result = await handler.default(req);

                    // Set the outgoing time for the log and log it.
                    logger.api(method.toUpperCase(), path, new Date() - incommingTime, 'sucess')

                    if (result instanceof ServerResponse) {
                        res.status(result.statusCode).json(result.payload);
                    } else {
                        // Assume a response of 200
                        res.status(200).json(result);
                    }

                } catch (error) {
                    logger.api(method.toUpperCase(), path, new Date() - incommingTime, 'error')
                    res.status(error.statusCode || 500).send(error.data || {
                        message: error.message || 'Internal Server Error',
                    })
                }
            });
            console.log(`${method.toUpperCase()} ${pathToRegister}`);
        })
    })
    console.log('---------------------------------')

    return router;
}