import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import hostsRouter from "./routes/hosts.js";
import usersRouter from "./routes/users.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/hosts", hostsRouter);
app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter)

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
