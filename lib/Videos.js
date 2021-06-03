import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const VideoSchema = new mongoose.Schema({
  title: String,
  path: String,
  publishedDate: Date,
});

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);
export default Video;
