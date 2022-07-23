import {setup , serve} from 'swagger-ui-express';
import YAML from 'yamljs';


const loadSwaggerUi = (router) => {
    const openapi = YAML.load('./openapi.yml');
    
    router.use('/docs', serve);
    router.get('/docs', setup(openapi, {
        explorer: true
    }));

    return router;
}

export default loadSwaggerUi