import express from "express";
import bodyParser from "body-parser";
import waitListRoutes from "./routes/waitList.routes";
import referralRoutes from "./routes/referral.routes";
import emojiFeedbackRoutes from "./routes/emoji-feedback.routes";
import feedbackRoutes from "./routes/feedback.routes";
import eventLoggerRoutes from "./routes/event-logger.routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/waitlist", waitListRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/emoji", emojiFeedbackRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/events", eventLoggerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
