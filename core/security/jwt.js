import jwt from 'jsonwebtoken';
import {ErrorInternalServer, ErrorUnauthorized} from '../error'
import { config } from '../config';
import logger from '../logger';

/**
 * 
 * @param {Object} data - The data to encode.
 * @param {Array} roles - The roles to encode.
 * @returns {String} - Jwt Token
 */
const generateAccessToken = (data, roles = []) => {
    try {

        const newData = JSON.parse(JSON.stringify(data));
        const audience = config.jwt.audience;
        const issuer = config.jwt.issuer;
        const jwtSecret = config.jwt.secret;

        const tokenType = 'access';
        const expiresIn = `${config.jwt.accessExperation} minutes`;

        // Add the roles to the data
        newData.roles = roles;

        const token = jwt.sign(data, jwtSecret, 
            {
                expiresIn: expiresIn,
                audience,
                issuer,
                subject: tokenType
            });

        return {
            token: token,
            expiresIn: expiresIn
        };
    } catch (error) {
        logger.error('jwt/generateAccessToken', error);
        
        throw new ErrorInternalServer();
    }
}

/**
 * 
 * @param {String} token - The token to decode.
 * @returns {Object} - Decoded Jwt Token
 */
const verifyAccessToken = (token) => {
    try {
        const audience = config.jwt.audience;
        const issuer = config.jwt.issuer;
        const jwtSecret = config.jwt.secret;

        const tokenType = 'access';
        var decoded = jwt.verify(token, jwtSecret, { audience, issuer, subject: tokenType });

        // Unauthorized
        if(!decoded) {
            throw new ErrorUnauthorized()
        }
        
        // Legit
        return decoded
    } catch (error) {
        logger.warn('jwt/verifyAccessToken', error);
        throw new ErrorUnauthorized()
    }
}

/**
 * 
 * @param {Object} data - The data to encode.
 * @returns {String} - Jwt Token
 */
const generateRefreshToken = (data) => {
    try {
        const newData = JSON.parse(JSON.stringify(data));
        const audience = config.jwt.audience;
        const issuer = config.jwt.issuer;
        const jwtSecret = config.jwt.secret;

        const tokenType = 'refresh';
        const expiresIn = `${config.jwt.refreshExperation} days`;

        const token = jwt.sign(newData, jwtSecret, 
            { 
                expiresIn: expiresIn,
                audience,
                issuer, 
                subject: tokenType
            });

        return {
            token: token,
            expiresIn: expiresIn
        };
    } catch (error) {
        logger.error('jwt/generateRefreshToken', error);
        
        throw new ErrorInternalServer();
    }
}

/**
 * 
 * @param {String} token - The token to decode.
 * @returns {Object} - Decoded Jwt Token
 */
const verifyRefreshToken = (token) => {
    try {
        const audience = config.jwt.audience;
        const issuer = config.jwt.issuer;
        const jwtSecret = config.jwt.secret;

        const tokenType = 'refresh';
        var decoded = jwt.verify(token, jwtSecret, { audience, issuer, subject: tokenType });

        // Unauthorized
        if(!decoded) {
            throw new ErrorUnauthorized()
        }
        
        // Legit
        return decoded
    } catch (error) {
        logger.warn('jwt/verifyRefreshToken', error);
        throw new ErrorUnauthorized()
    }
}

export {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
}