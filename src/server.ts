import { createServer } from "http";
import app from "./app.js";
import { appConfig } from "./config/appConfig.js";

const PORT = appConfig.port;

const server = createServer(app);

async function main() {
  try {
    console.log("✅ Database connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
  
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log("✅ Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

main();
