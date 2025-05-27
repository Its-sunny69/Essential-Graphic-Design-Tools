import mongoose, { model, models } from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  lastRequest: { type: Date, default: Date.now },
});

const RateLimit = models.RateLimit || model("RateLimit", RateLimitSchema);

export default RateLimit;
