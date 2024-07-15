/**
 * Improves UX by allowing developer log a message than waiting before moving on.
 * @param ms - Miliseconds
 * @returns Promise that returns nothing.
 */
export const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const shutdown = (exitCode = 0) => {
    // Close stdin if it is open
    if (!process.stdin.destroyed) {
      process.stdin.destroy();
    }
    // End stdout and stderr
    process.stdout.end();
    process.stderr.end();
    // Exit the process with the given exit code
    process.exit(exitCode);
  }

  export const findActiveHandlesAndRequests = () => {
    const activeHandles = (process as any)._getActiveHandles();
    const activeRequests = (process as any)._getActiveRequests();
    
    console.log('Active Handles:', activeHandles);
    console.log('Active Requests:', activeRequests);
  }