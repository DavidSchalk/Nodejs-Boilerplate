import fs from 'fs';

// Configure
// Write your logs to some service.
/**
 * 
 * @param {string} originate 
 * @param {Object} data 
 */
const warn = (originate, data) =>
{
    const log = `WARN | ${new Date()} | ${originate} | ${JSON.stringify(data)} \n`;
    fs.appendFileSync('./logs/warn.log', log);
}

const error = (originate, data) =>
{
    const log = `ERROR | ${new Date()} | ${originate} | ${JSON.stringify(data)} \n`;
    fs.appendFileSync('./logs/warn.log', log);
}

const info = (originate, data) =>
{
    const log = `INFO | ${new Date()} | ${originate} | ${JSON.stringify(data)}\n `;
    fs.appendFileSync('./logs/warn.log', log);
}

const api = (method, uri, duration, status) =>
{
    console.log(`REQUEST | ${method} | ${uri} | ${new Date()} | ${duration}ms | ${status}`);
}

export default {
    warn,
    error,
    info,
    api
} ;
