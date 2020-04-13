# TFRecord Viewer

"How about checking your data before going deeper?"

Use TFRecord Viewer to browse contents of TFRecord files with object detection/classification annotations.

This viewer is wrapper around TFRecord Viewer project by Milan Sulc [TFRecord-Viewer](https://github.com/sulc/tfrecord-viewer).

You can upload (upto 1000 TFRecord files), and check them using a carousel view, you can select multiple files, and either get list of selected files or download the selected ones in a zip file.

You can run this project standalone or using Docker. Using Docker is recommended, make sure to have Docker and docker-compose installed, then run:

`docker-compose up`

If you want to run without Docker, make sure you have Tensorflow 1.15 installed. Tensorflow is not listed as dependency in requirements.txt, as base Docker image (tensorflow/tensorflow:1.15.0-py3) has already Tensorflow installed if you are using without Docker. Then install all other dependencies with:

```
npm install
pip3 install -r requirements.txt
```

After that you can run:

`npm run runall`

<img src="public/TRRecord_File_Viewer-1.png" />

![Upload screen](public/TRRecord_File_Viewer-1.png)
![Select files screen](public/TRRecord_File_Viewer-2.png)
![Summary screen](public/TRRecord_File_Viewer-3.png)
