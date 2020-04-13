import React, { useState, useRef, useCallback, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Checkbox, Button, Empty, Tag } from "antd";

const { CheckableTag } = Tag;

const TFViewer = ({ files, initialSelected, setSelectedFiles }) => {
  const [selected, setSelected] = useState(
    initialSelected.reduce((memo, item) => {
      memo[item] = true;
      return memo;
    }, {})
  );
  const [shown, setShown] = useState(0);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);
  const [selectedFiltered, setSelectedFiltered] = useState([]);
  const carouselRef = useRef();
  const selectedCheckBox = useRef();

  const selectFn = useCallback(
    (e) => {
      const count = showOnlySelected ? selectedFiltered.length : files.length;
      if (e.keyCode === 32) {
        selectFile(files[shown]);
      }
      if (e.keyCode === 37 && shown > 0) {
        setShown(shown - 1);
      }
      if (e.keyCode === 39 && shown < count) {
        setShown(shown + 1);
      }
    },
    [shown, selected]
  );

  useEffect(() => {
    document.removeEventListener("keydown", selectFn, false);
    document.addEventListener("keydown", selectFn, false);

    return () => {
      document.removeEventListener("keydown", selectFn, false);
    };
  }, [shown, selected]);

  const selectFile = (file) => {
    if (file) {
      if (selected[file]) {
        const updated = { ...selected };
        delete updated[file];
        setSelected(updated);
      } else {
        setSelected({ ...selected, [file]: true });
      }
    }
  };

  const carouselFiles = showOnlySelected ? selectedFiltered : files;

  return (
    <>
      <div>
        {showOnlySelected && carouselFiles.length === 0 ? (
          <Empty description="No files selected." style={{ marginTop: 50 }} />
        ) : (
          <>
            <CheckableTag
              style={{ marginTop: 40, marginBottom: 10, fontSize: 20 }}
              // icon={
              //   selected[carouselFiles[shown]] ? (
              //     <CheckCircleFilled />
              //   ) : (
              //     <MinusCircleOutlined />
              //   )
              // }
              checked={selected[carouselFiles[shown]]}
              onChange={() => selectFile(carouselFiles[shown])}
            >
              <Checkbox
                checked={selected[carouselFiles[shown]]}
                onChange={() => selectFile(carouselFiles[shown])}
                style={{ marginRight: 20 }}
              />
              {selected[carouselFiles[shown]] ? "Selected" : "Not Selected"}
            </CheckableTag>

            <Carousel
              ref={carouselRef}
              // centerMode
              useKeyboardArrows
              dynamicHeight
              showIndicators={false}
              selectedItem={shown}
              showThumbs={showThumbs}
              onClickItem={() => setShowThumbs(true)}
              onChange={(item) => {
                if (!showThumbs) setShowThumbs(true);
                setShown(item);
              }}
            >
              {carouselFiles.map((file) => (
                <div key={file}>
                  <img
                    src={`http://localhost:5000/images/${file}`}
                    alt={file}
                  />
                  <p className="legend">{file}</p>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
      <Checkbox
        ref={selectedCheckBox}
        style={{
          width: "100%",
          marginBottom: 50,
          marginTop: showThumbs ? 0 : 50,
        }}
        checked={showOnlySelected}
        onChange={() => {
          setShown(0);
          setShowThumbs(false);
          setSelectedFiltered(Object.keys(selected));
          setShowOnlySelected(!showOnlySelected);
          selectedCheckBox.current.blur();
        }}
      >
        Show only selected
      </Checkbox>
      <Button
        style={{ width: "100%" }}
        onClick={() => setSelectedFiles(Object.keys(selected))}
      >
        Complete
      </Button>
    </>
  );
};

export default TFViewer;
