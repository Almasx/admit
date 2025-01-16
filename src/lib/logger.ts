import * as Sentry from "@sentry/nextjs";

export const getLogger = (service: string) => {
  // Helper function for structured logging with Sentry
  return {
    info: (message: string, data?: Record<string, unknown>) => {
      Sentry.addBreadcrumb({
        category: service,
        message,
        level: "info",
        data,
      });
      // Also log to Vercel
      console.log(
        JSON.stringify({
          level: "info",
          timestamp: new Date().toISOString(),
          service,
          message,
          ...data,
        })
      );
    },
    error: (message: string, data?: Record<string, unknown>, error?: Error) => {
      if (error) {
        Sentry.captureException(error, {
          extra: { ...data },
          tags: { service },
        });
      }
      // Also log to Vercel
      console.error(
        JSON.stringify({
          level: "error",
          timestamp: new Date().toISOString(),
          service,
          message,
          ...data,
          errorMessage: error?.message,
          errorStack: error?.stack,
        })
      );
    },
  };
};
