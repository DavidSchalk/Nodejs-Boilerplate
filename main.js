import express from 'express';
import loadSwaggerUi from './core/openapi';
import registerRoutes from './core/routing/router';
import initiateEnvConfig, { config } from './core/config';

const app = express();
initiateEnvConfig();

const port = config.port;
app.use(express.json());
const router = express.Router();

loadSwaggerUi(router);
registerRoutes(router);

app.use(router);
app.listen(port, () => {
    console.log(`Your ${config.env} app is listening on http://localhost:${port}`)
});