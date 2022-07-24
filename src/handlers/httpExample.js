
import Http from "../../core/http.js";

export default async (req) => {

    const httpClient = Http.connect('https://webhook.site', 'Some bearer token');
    
    const result = await httpClient.post('/b6315ae1-334a-4cfb-be2e-6caa89cd717f', {
        body: {
            name: 'John Doe',
            age: 42,
        }
    });


    return result;
}