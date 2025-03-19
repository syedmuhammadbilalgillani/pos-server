// src/logger/custom-logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';
// type StatusCodeRange =
//   | 'success'
//   | 'redirect'
//   | 'clientError'
//   | 'serverError'
//   | 'default';

interface RequestLogData {
  method: string;
  path: string;
  [key: string]: unknown;
}

interface ResponseLogData {
  method: string;
  path: string;
  statusCode: number;
  responseTime: string | number;
  [key: string]: unknown;
}

type LogMessage = string | Record<string, unknown>;

@Injectable()
export class CustomLogger implements LoggerService {
  // ANSI color codes
  private colors = {
    reset: '\x1b[0m',
    // Log levels
    log: '\x1b[32m', // Green
    error: '\x1b[31m', // Red
    warn: '\x1b[33m', // Yellow
    debug: '\x1b[36m', // Cyan
    verbose: '\x1b[35m', // Magenta

    // Request/Response colors
    request: '\x1b[94m', // Bright Blue
    response: '\x1b[92m', // Bright Green

    // Other elements
    timestamp: '\x1b[90m', // Gray
    context: '\x1b[1m', // Bold
    method: {
      GET: '\x1b[32m', // Green
      POST: '\x1b[34m', // Blue
      PUT: '\x1b[33m', // Yellow
      DELETE: '\x1b[31m', // Red
      PATCH: '\x1b[35m', // Magenta
      OPTIONS: '\x1b[36m', // Cyan
      default: '\x1b[37m', // White
    },
    statusCode: {
      success: '\x1b[32m', // Green (2xx)
      redirect: '\x1b[36m', // Cyan (3xx)
      clientError: '\x1b[33m', // Yellow (4xx)
      serverError: '\x1b[31m', // Red (5xx)
      default: '\x1b[37m', // White
    },
  };

  log(message: unknown, context?: string): void {
    this.formatAndLog('LOG', message, context);
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.formatAndLog('ERROR', message, context, trace);
  }

  warn(message: unknown, context?: string): void {
    this.formatAndLog('WARN', message, context);
  }

  debug(message: unknown, context?: string): void {
    this.formatAndLog('DEBUG', message, context);
  }

  verbose(message: unknown, context?: string): void {
    this.formatAndLog('VERBOSE', message, context);
  }

  private getStatusColor(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) {
      return this.colors.statusCode.success;
    } else if (statusCode >= 300 && statusCode < 400) {
      return this.colors.statusCode.redirect;
    } else if (statusCode >= 400 && statusCode < 500) {
      return this.colors.statusCode.clientError;
    } else if (statusCode >= 500) {
      return this.colors.statusCode.serverError;
    }
    return this.colors.statusCode.default;
  }

  private getMethodColor(method: string): string {
    const upperMethod = method?.toUpperCase() as HttpMethod;
    return this.colors.method[upperMethod] || this.colors.method.default;
  }

  private getLevelColor(level: string): string {
    const lowerLevel = level.toLowerCase() as LogLevel;
    return this.colors[lowerLevel] || this.colors.log;
  }

  private formatAndLog(
    level: string,
    message: unknown,
    context?: string,
    trace?: string,
  ): void {
    const timestamp = new Date().toISOString();
    const levelColor = this.getLevelColor(level);

    const parsedMessage: LogMessage = this.parseMessage(message);
    let coloredOutput = '';

    // Construct the log entry
    const logEntry: Record<string, unknown> = {
      timestamp,
      level,
      context,
      message: parsedMessage,
    };

    // Include trace in case of errors
    if (trace) {
      logEntry.trace = trace;
    }

    // Apply colors based on log type and content
    if (typeof parsedMessage === 'object' && parsedMessage !== null) {
      // Format timestamp
      coloredOutput += `${this.colors.timestamp}[${timestamp}]${this.colors.reset} `;

      // Format level
      coloredOutput += `${levelColor}[${level}]${this.colors.reset} `;

      // Format context
      if (context) {
        coloredOutput += `${this.colors.context}[${context}]${this.colors.reset} `;
      }

      // Special handling for Request/Response logs
      if (context === 'Request') {
        const requestData = parsedMessage as RequestLogData;
        const method = String(requestData.method || '');
        const path = String(requestData.path || '');
        const methodColor = this.getMethodColor(method);

        coloredOutput += `\n${this.colors.request}→ ${methodColor}${method}${this.colors.reset} ${path}`;

        // Add more details in a structured format
        coloredOutput += `\n${JSON.stringify(requestData, null, 2)}`;
      } else if (context === 'Response') {
        const responseData = parsedMessage as ResponseLogData;
        const method = String(responseData.method || '');
        const path = String(responseData.path || '');
        const statusCode = Number(responseData.statusCode || 0);
        const responseTime = responseData.responseTime || '';

        const methodColor = this.getMethodColor(method);
        const statusColor = this.getStatusColor(statusCode);

        coloredOutput += `\n${this.colors.response}← ${methodColor}${method}${this.colors.reset} ${path} ${statusColor}${statusCode}${this.colors.reset} (${responseTime})`;

        // Add more details in a structured format
        coloredOutput += `\n${JSON.stringify(responseData, null, 2)}`;
      } else if (context === 'Error' || level === 'ERROR') {
        // Special formatting for errors
        coloredOutput += `\n${this.colors.error}${JSON.stringify(parsedMessage, null, 2)}${this.colors.reset}`;

        if (trace) {
          coloredOutput += `\n${this.colors.error}Stack Trace:${this.colors.reset}\n${trace}`;
        }
      } else {
        // Default formatting for other object logs
        coloredOutput += `\n${JSON.stringify(parsedMessage, null, 2)}`;
      }
    } else {
      // Simple string message
      coloredOutput = `${this.colors.timestamp}[${timestamp}]${this.colors.reset} `;
      coloredOutput += `${levelColor}[${level}]${this.colors.reset} `;

      if (context) {
        coloredOutput += `${this.colors.context}[${context}]${this.colors.reset} `;
      }

      coloredOutput += String(parsedMessage);
    }

    // Output the colored log
    console.log(coloredOutput);

    // Also log the structured JSON for potential log processing systems
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      console.log(JSON.stringify(logEntry));
    }
  }

  private parseMessage(message: unknown): LogMessage {
    if (
      typeof message === 'string' &&
      message.startsWith('{') &&
      message.endsWith('}')
    ) {
      try {
        return JSON.parse(message) as Record<string, unknown>;
      } catch (error) {
        console.log('Error parsing JSON:', error);
        // If parsing fails, just return the original message
        return message;
      }
    }

    if (typeof message === 'object' && message !== null) {
      return message as Record<string, unknown>;
    }

    return String(message);
  }
}
