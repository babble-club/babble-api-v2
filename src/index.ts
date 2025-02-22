// Application bootstrap
import { setupApp } from '@/application/bootstrap/setup-main-app.utils';
// Shared utilities
import { ValidationMessages } from '@/shared/constants/validation-messages';
import AppLogger from '@/shared/utils/app-logger.utils';

const logger = new AppLogger(__filename).child({
  filepath: __filename,
});
/**
 * Main application bootstrap function.
 * Initializes the application and starts the HTTP server.
 */
async function bootstrap() {
  try {
    const app = await setupApp();
    // Start the server
    app.listen(process.env.PORT || 3000, () => {
      logger.info(`🚀 Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    logger.error(
      ValidationMessages.HTTP.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
    process.exit(1);
  }
}
// Start the application
bootstrap().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
