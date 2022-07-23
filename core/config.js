import process from 'process';
import dotenv from 'dotenv';

let config = {};

const initiateEnvConfig = () => {
    config = {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
        jwt: {
            secret: process.env.JWT_SECRET || 'secret',
            audience: process.env.JWT_AUDIENCE || 'my-audience',
            issuer: process.env.JWT_ISSUER || 'my-issuer',
            accessExperation: process.env.JWT_ACCESS_EXPIRATION_MINUTES || '60',
            refreshExperation: process.env.JWT_REFRESH_EXPIRATION_DAYS || '3',
        },
    }
    return config;
}

export default initiateEnvConfig;
export { config };