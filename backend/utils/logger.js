const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, printf, colorize } = format;

// Human-friendly timestamp format
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

// Console format: Level first, readable time, message/stack; colorized for readability
const consoleFormat = printf(({ timestamp, level, message, stack }) => {
  const lvl = level.toUpperCase();
  return `${lvl} ${timestamp} - ${stack || message}`;
});

// File format: same structure but without colors
const fileFormat = printf(({ timestamp, level, message, stack }) => {
  const lvl = level.toUpperCase();
  return `${lvl} ${timestamp} - ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: combine(timestamp({ format: timeFormat }), errors({ stack: true })),
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: combine(colorize(), timestamp({ format: timeFormat }), consoleFormat),
    }),
    new transports.File({ filename: 'error.log', level: 'error', format: combine(timestamp({ format: timeFormat }), fileFormat) }),
    new transports.File({ filename: 'combined.log', format: combine(timestamp({ format: timeFormat }), fileFormat) }),
  ],
  exitOnError: false,
});

// morgan-compatible stream
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
