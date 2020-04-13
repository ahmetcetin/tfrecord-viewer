import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Radio } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import "react-toastify/dist/ReactToastify.css";

const { TextArea } = Input;

const seperatorChar = {
  linebreak: "\n",
  comma: ",",
};

const Summary = ({ selectedFiles, reset, setInitialSelected }) => {
  const [seperator, setSeperator] = useState("linebreak");
  const textAreaRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const download = async () => {
    const promises = selectedFiles.map((file) => {
      console.log(file);
      return axios({
        url: `http://localhost:8000/files/${file}`,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        return { file, data: response.data };
      });
    });

    Promise.all(promises)
      .then((files) => {
        const zip = new JSZip();
        files.forEach((item) => {
          zip.file(item.file, item.data);
        });

        zip
          .generateAsync({ type: "blob" })
          .then((content) => {
            saveAs(content, "TFRecordFiles.zip");
            toast.success("download success");
          })
          .catch((err) => {
            console.log(err);
            toast.error("download failed");
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("download failed");
      });
  };

  const text = selectedFiles.join(seperatorChar[seperator]);

  return (
    <div style={{ marginTop: 50 }}>
      <TextArea ref={textAreaRef} value={text} autoSize />
      <Radio.Group
        value={seperator}
        onChange={(e) => setSeperator(e.target.value)}
      >
        <Radio value="linebreak">Linebreak seperated</Radio>
        <Radio value="comma">Comma seperated</Radio>
      </Radio.Group>
      <div style={{ width: "100%" }}>
        <CopyToClipboard text={text} onCopy={() => toast.success("Copied!")}>
          <Button>Copy</Button>
        </CopyToClipboard>
        <Button onClick={download}>Download</Button>
      </div>
      <div style={{ width: "100%" }}>
        <Button
          type="primary"
          onClick={() => setInitialSelected(selectedFiles)}
        >
          Back
        </Button>
        <Button onClick={reset}>Reset</Button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Summary;
