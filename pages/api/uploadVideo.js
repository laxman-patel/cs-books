import nc from "next-connect";
import multer from "multer";
import { nanoid } from "nanoid";
import Video from "../../lib/Videos";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./videos",
    filename: (req, file, cb) =>
      cb(null, `${nanoid(10)}-${file.originalname}`.replace(/\s/g, "")),
  }),
});

const apiRoute = nc({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Oops! something happened. ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

const uploadMiddleware = upload.single("videoFile");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const { videoTitle } = req.body;
  const { path } = req.file;

  const video = await Video.create({
    title: videoTitle,
    path: path.replace(/\s/g, ""),
    publishedDate: Date.now(),
  });

  console.log({ video });

  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
