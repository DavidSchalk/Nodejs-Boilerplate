import https from 'https';
import http from 'http';
import { ErrorDependencyFailed, ErrorInternalServer } from './error';

let instance = null;
class Http {
    constructor(url, bearerToken = null) {
        this.url = url;
        this.bearerToken = bearerToken;
    }


    static connect(url, bearerToken = null) {

        if(instance) {
            return instance;
        }


        return new Http(url, bearerToken);
    }
    
    async post (path, { body , headers}) {
    
        const result = await this.makeRequest('POST', path, { body , headers});

        return result;
    }


    async get (path, { headers}) {
    
        const result = await this.makeRequest('GET',  path, { headers});

        return result;
    }

    async put ( path, { body , headers}) {
    
        const result = await this.makeRequest('PUT',  path, { body , headers});

        return result;
    }

    async delete (path, { headers}) {
    
        const result = await this.makeRequest('DELETE', path, { headers});

        return result;
    }

    async json() {
        return JSON.parse(this);
    }

    async makeRequest (method, path, { body , headers}) {

        return new Promise((resolve, reject) => {
            let port = 80;
            let httpRequest = http;
            let host = '';
            if(this.url.startsWith('https://')) {
                httpRequest = https;
                port = 443;
        
                host = this.url.replace('https://', '');
            } else {
                host = this.url.replace('http://', '');
            }
        
            // Stringify the body.
            const data = JSON.stringify(body)
        
            // Merge the headers with the default headers.

            let authHeaders = {};
            if(this.bearerToken) {
                authHeaders = {
                    'authorization': `Bearer ${this.bearerToken}`,
                }
            }

            const mergedHeaders = {
                ...headers,
                ...authHeaders,
                'content-type': 'application/json',
                'content-length': data.length
            };
        
            // Build the options
            const options = {
                method: method,
                headers: mergedHeaders,
                hostname: host,
                path: path,
                port: port, 
            }
            
            let buffer = null;
        
            const req = httpRequest.request(options, res => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new ErrorDependencyFailed(`statusMessage=${res.statusMessage}, statusCode=${res.statusCode}`));
                }
        
                res.on('data', d => {
                    if(buffer === null) {
                        buffer = d;
                    } else {
                        // eslint-disable-next-line no-undef
                        buffer = Buffer.concat([buffer, d]);
                    }

                });
        
                res.on('end', () => {
                    try {
                        if(buffer) {
                            const result = buffer.toString();
                            if(res.headers['content-type'] === 'application/json' ) {
                                const json = JSON.parse(result);
                                resolve(json);
                            } else {
                                resolve(result)
                            }
                        } else {
                            resolve()
                        }
                    } catch (error) {
                        
                        return reject(new ErrorInternalServer(error.message));
                    }
                });
        
                res.on('error', e => {
                    reject(e)
                });
            });
        
            req.on('error', error => {
                reject(error)
            })
        
            req.write(data)
            req.end();
        });
    }
}


export default Http;