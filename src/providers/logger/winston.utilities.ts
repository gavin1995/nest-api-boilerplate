import { green, yellow } from 'colors/safe';
import { Format } from 'logform';
import { format } from 'winston';
import safeStringify from 'fast-safe-stringify';

const nestLikeConsoleFormat = (appName = 'NestWinston'): Format => format.printf(({ context, level, timestamp, message, ...meta }) => {
  return `${green(`[${appName}]`)} ` +
    `${yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
    ('undefined' !== typeof timestamp ? `${new Date(timestamp).toLocaleString()} ` : '') +
    ('undefined' !== typeof context ? `${yellow('[' + context + ']')} ` : '') +
    `${green(message)} - ` +
    `${safeStringify(meta)}`;
});

export const utilities = {
  format: {
    nestLike: nestLikeConsoleFormat,
  },
};
