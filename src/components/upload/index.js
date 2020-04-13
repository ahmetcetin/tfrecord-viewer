import React, { Component } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { Button, Switch } from "antd";

import "react-toastify/dist/ReactToastify.css";

class Upload extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    loading: false,
    showLabels: false,
  };

  filterNonTFRecord = (file) => file.name.split(".").pop() === "tfrecord";

  checkMimeType = (event) => {
    //getting file object
    const { files } = event.target;
    //define message container
    const errors = [];
    // list allow mime type
    // const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    Array.from(files).forEach((file) => {
      const ext = file.name.split(".").pop();
      if (ext !== "tfrecord") {
        // create error message and assign to container
        errors.push(ext + " is not a supported format\n");
      }
    });

    errors.forEach((err) => {
      toast.error(err);
      event.target.value = null;
    });

    return true;
  };
  maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 1000) {
      const msg = "Only 1000 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 20000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = (event) => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      // this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: Array.from(files).filter(this.filterNonTFRecord),
        loaded: 0,
      });
    }
  };
  onClickHandler = () => {
    const data = new FormData();
    this.state.selectedFile.forEach((file) => data.append("file", file));

    data.append("showLabels", this.state.showLabels);
    this.setState({ loading: true });
    axios
      .post("http://localhost:8000/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        // then print response status
        this.setState({ loading: false });
        this.props.setFiles(
          Array.from(this.state.selectedFile).map((file) =>
            file.name.split("/").pop()
          )
        );
        toast.success("upload success");
      })
      .catch((err) => {
        // then print response status
        toast.error("upload fail");
      });
  };

  render() {
    const loadingText =
      Math.round(this.state.loaded, 2) === 100
        ? "Preparing images..."
        : "Uploading files...";
    return (
      <LoadingOverlay active={this.state.loading} spinner text={loadingText}>
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <h1 style={{ marginBottom: 30, marginTop: 30, marginLeft: 40 }}>
              <img src="/logo.jpeg" alt="tfrecord logo" width={200} />
              File Viewer
            </h1>
            <div className="form-group files">
              <label>Upload Your File(s) - max 1000 files</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded}>
                {Math.round(this.state.loaded, 2)}%
              </Progress>
            </div>
            <div style={{ marginBottom: 10 }}>
              Show Labels
              <Switch
                style={{ marginLeft: 10 }}
                checked={this.state.showLabels}
                onChange={() =>
                  this.setState({ showLabels: !this.state.showLabels })
                }
              />
            </div>

            <Button
              type="primary"
              className="btn btn-success btn-block"
              onClick={this.onClickHandler}
            >
              Upload
            </Button>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Upload;
