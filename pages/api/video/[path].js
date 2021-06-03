import nc from "next-connect";
import fs from "fs";

const apiRoute = nc({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.get((req, res) => {
  try {
    const { path } = req.query;
    const { range } = req.headers;

    if (!range) {
      res.status(400).json({ message: "Range header is required" });
    }

    const videoPath = "./videos/" + path;
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Range": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
  } catch (error) {
    console.log({ error });
  }
});

export default apiRoute;
