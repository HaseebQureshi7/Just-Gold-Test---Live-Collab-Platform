import { ConsoleUtil } from "./shared/utils/Console.ts";

async function startup() {
  const consoleUtil = new ConsoleUtil();

  console.log(consoleUtil.infoLog(`<~> Running startup tasks...`));
  const startTime = performance.now(); // Start the timer manually

  try {

    // Calculate elapsed time
    const elapsedTime = performance.now() - startTime;
    console.info(
      consoleUtil.successLog(`\nAll startup tasks executed successfully in ${elapsedTime.toFixed(2)}ms`)
    );
  } catch (err) {
    console.error("\n<!> Error during startup tasks:\n\n", err);

    // Server Shutdown Messages
    console.error("\nShutting server down in 3 seconds...");
    setTimeout(() => console.error("Shutting server down in 2..."), 1000);
    setTimeout(() => console.error("Shutting server down in 1..."), 2000);
    setTimeout(() => {
      console.error("❌ Server shutdown.");
      process.exit(1);
    }, 3000);
  }
}

export default startup;
