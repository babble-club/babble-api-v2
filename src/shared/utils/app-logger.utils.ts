import pino, { type Logger, type ChildLoggerOptions, Level } from 'pino';
import path from 'node:path';
import { getDotEnv } from './dotEnv-provider.utils';
import { Environment } from '../environment';

type CustomLevels = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface AppChildLoggerOptions extends ChildLoggerOptions {
  filepath: string;
}

class AppLogger {
  private logger: Logger<CustomLevels>;
  private filename: string;

  constructor(filename: string) {
    const isPrettyPrintEnabled = Environment.isLocal() || Environment.isDevelopment();

    const baseConfig: pino.LoggerOptions<CustomLevels> = {
      name: getDotEnv('APP_NAME', 'BABBLE') as string,
      level: getDotEnv('LOGGER_LEVEL', 'info') as string,
      messageKey: 'MSG:',
      nestedKey: 'PAYLOAD:',
      formatters: {
        level: (label: string) => ({ level: label }),
        log: (object: any) => ({
          ...object,
          file: this.filename,
        }),
      },
      customLevels: {
        trace: 10,
        debug: 20,
        info: 30,
        warn: 40,
        error: 50,
        fatal: 60,
      },
      useOnlyCustomLevels: true,
    };

    // Conditionally add transport for local and dev environments
    const config =
      typeof isPrettyPrintEnabled === 'boolean' && isPrettyPrintEnabled
        ? {
            ...baseConfig,
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: false,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
              },
            },
          }
        : baseConfig;
    this.filename = path.basename(filename);
    this.logger = pino<CustomLevels>(config);
  }

  public child(options: AppChildLoggerOptions): Logger<CustomLevels> {
    return this.logger.child(options);
  }

  public trace(msg: string, obj?: any): void {
    this.logger.trace(obj, msg);
  }

  public debug(msg: string, obj?: any): void {
    this.logger.debug(obj, msg);
  }

  public info(msg: string, obj?: any): void {
    this.logger.info(obj, msg);
  }

  public warn(msg: string, obj?: any): void {
    this.logger.warn(obj, msg);
  }

  public error(msg: string, obj?: any): void {
    this.logger.error(obj, msg);
  }

  public fatal(msg: string, obj?: any): void {
    this.logger.fatal(obj, msg);
  }
}

export default AppLogger;
