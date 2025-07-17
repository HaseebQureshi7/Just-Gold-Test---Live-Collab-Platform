export class ConsoleUtil {
    // Define ANSI escape codes for colors
    private colors = {
      success: "\x1b[32m", // Green for success
      error: "\x1b[31m", // Red for error
      warning: "\x1b[33m", // Yellow for warning
      info: "\x1b[36m", // Cyan for info
      reset: "\x1b[0m", // Resets the color to default
    };
  
    successLog(message: string) {
      return `${this.colors.success}${message}${this.colors.reset}`
    }
  
    infoLog(message: string) {
      return `${this.colors.info}${message}${this.colors.reset}`
    }
  
    warningLog(message: string) {
      return `${this.colors.warning}${message}${this.colors.reset}`
    }
  
    errorLog(message: string) {
      return `${this.colors.error}${message}${this.colors.reset}`
    }
  }
  