const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const fsExtra = require("fs-extra");
const { PythonShell } = require("python-shell");

let shell;

app.use(cors());
// app.use(zip());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("file");

app.get("/", (req, res) => {
  return res.send("Hello Server");
});
app.post("/upload", (req, res) => {
  fsExtra.emptyDirSync(`${__dirname}/files`);
  if (shell) shell.childProcess.kill();

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);

      // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }

    const args = [`${__dirname}/files/*`];
    console.log("showLabels", req.body.showLabels, typeof req.body.showLabels);
    if (req.body.showLabels === "true") args.push("--showLabels");

    // console.log(fs.readdirSync("./files"));
    shell = new PythonShell("tfviewer.py", {
      mode: "text",
      pythonOptions: ["-u"],
      args,
      // args: [`${__dirname}/files/*`],
    });

    shell.on("message", (message) => {
      console.log(message);
      if (message.startsWith("Loaded")) res.status(200).send("Loaded");
    });
    shell.on("error", (err) => {
      res.status(500).send(err);
      console.error(err);
    });

    // Everything went fine.
  });
});

app.use("/files", express.static("files"));

app.listen(8000, () => {
  console.log("App running on port 8000");
});
