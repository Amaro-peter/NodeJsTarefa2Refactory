import { app } from "./app";
import { env } from '!/index';
import { logger } from "./lib/logger";
import { logError } from "./lib/logger/helper";

app.listen({
   host: '0.0.0.0',
   port: env.APP_PORT,
})
.then(() => {
   logger.info(`🚀 HTTP Server Running on port ${env.APP_PORT}!`);
})
.catch((err) => {
   logError(err, {}, 'Failed to start HTTP server!');
   process.exit(1);
});