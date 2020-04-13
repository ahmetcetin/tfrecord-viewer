import React, { useState } from "react";
import Upload from "./components/upload";
import Gallery from "./components/gallery";
import Summary from "./components/summary";

import "antd/dist/antd.css";

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [initialSelected, setInitialSelected] = useState([]);

  const reset = () => {
    setFiles([]);
    setSelectedFiles([]);
  };

  const setTempSelected = (files) => {
    setSelectedFiles([]);
    setInitialSelected(files);
  };

  return (
    <div className="container">
      {files.length === 0 ? (
        <Upload setFiles={setFiles} />
      ) : selectedFiles.length === 0 ? (
        <Gallery
          setSelectedFiles={setSelectedFiles}
          files={files}
          initialSelected={initialSelected}
        />
      ) : (
        <Summary
          selectedFiles={selectedFiles}
          reset={reset}
          setInitialSelected={setTempSelected}
        />
      )}
    </div>
  );
};

export default App;
