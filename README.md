# TFRecord Viewer

"How about checking your data before going deeper?"

Use TFRecord Viewer to browse contents of TFRecord files with object detection/classification annotations.

This viewer is wrapper around TFRecord Viewer project by Milan Sulc [TFRecord-Viewer](https://github.com/sulc/tfrecord-viewer).

You can upload (upto 1000 TFRecord files), and check them using a carousel view, you can select multiple files, and either get list of selected files or download the selected ones in a zip file.

You can run this project standalone or using Docker. Using Docker is recommended, make sure to have Docker and docker-compose installed, then run:

`docker-compose up`

If you want to run without Docker, make sure you have Python3 and Tensorflow 1.15 installed. Tensorflow is not listed as dependency in requirements.txt, as base Docker image (tensorflow/tensorflow:1.15.0-py3) has already Tensorflow installed. Then install all other dependencies with:

```
npm install
pip3 install -r requirements.txt
```

After that you can run:

```
npm run runall
```

***Important note:*** Make sure ports 3000, 5000, and 8000 are not in use before running this project.


![Upload screen](https://user-images.githubusercontent.com/5046786/79118614-aed14600-7d8e-11ea-83fd-13157bd58cc5.png)

On the upload screen, if you select mixed files, only files with tfrecord extension will be uploaded, other file types will be ignored.


![Select Files screen](https://user-images.githubusercontent.com/5046786/79118700-df18e480-7d8e-11ea-978f-76533cbba929.png)

On the gallery view screen, you can navigate with right-arrow, left-arrow keys on the keyboard, and select the shown file with space key.


![Summary screen](https://user-images.githubusercontent.com/5046786/79118780-12f40a00-7d8f-11ea-8c67-d946d2c96722.png)

On the summary page, you can concatenate the list of files by line-break, or comma, then you can copy to clipboard. Or you can download the selected files in a zip file.
