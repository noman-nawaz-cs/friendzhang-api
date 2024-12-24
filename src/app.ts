import express from "express";
import bodyParser from "body-parser";
import waitListRoutes from "./routes/waitList.route";
import referralRoutes from "./routes/referral.route";
import emojiFeedbackRoutes from "./routes/emoji-feedback.route";
import feedbackRoutes from "./routes/feedback.route";
import eventLoggerRoutes from "./routes/event-logger.route";

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
