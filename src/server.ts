import { app } from "./app";
import { env } from '!/index';
import { logger } from "./lib/logger";
import { logError } from "./lib/logger/helper";
import cron from "node-cron";
import { sendDailyMostLikedPosts } from "./use-cases/messaging/get-by-most-liked";

app.listen({
   host: '0.0.0.0',
   port: env.APP_PORT,
})
.then(() => {
   logger.info(`🚀 HTTP Server Running on port ${env.APP_PORT}!`);
   cron.schedule('10 * * * * *', async () => {
      await sendDailyMostLikedPosts();
   });
})
.catch((err) => {
   logError(err, {}, 'Failed to start HTTP server!');
   process.exit(1);
});