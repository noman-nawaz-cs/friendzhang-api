import express from "express";
import bodyParser from "body-parser";
import waitListRoutes from "./routes/waitList.routes";
import referralRoutes from "./routes/referral.routes";
import emojiFeedbackRoutes from "./routes/emoji-feedback.routes";
import feedbackRoutes from "./routes/feedback.routes";
import eventLoggerRoutes from "./routes/event-logger.routes";

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/waitlist", waitListRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/emoji", emojiFeedbackRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/events", eventLoggerRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Friendzhang API" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
