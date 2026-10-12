type LogFields = Record<string, unknown>;

function log(level: "info" | "warn" | "error", message: string, fields?: LogFields) {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...fields
  };
  // Swap for a structured log sink (e.g. Pino + a log drain) in production.
  // eslint-disable-next-line no-console
  console[level === "info" ? "log" : level](JSON.stringify(entry));
}

export const logger = {
  info: (message: string, fields?: LogFields) => log("info", message, fields),
  warn: (message: string, fields?: LogFields) => log("warn", message, fields),
  error: (message: string, fields?: LogFields) => log("error", message, fields)
};
