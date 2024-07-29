import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import OpeningLetter from "./components/OpeningLetter";
import QNA from "./components/QNA";

const App = () => {
  const [buttonClickState, setButtonClickState] = useState(false);
  const [buttonNextClickState, setButtonNextClickState] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);

  const handleLetterOpen = () => {
    setLetterOpened(true);
  };

  return (
    <div className="app">
      {!buttonClickState ? (
        <div
          className="button-container"
          onClick={() => {
            setButtonClickState(true);
          }}
        >
          <a>
            <span> </span>
            <span> </span>
            <span> </span>
            <span> </span>
            Click Me
          </a>
        </div>
      ) : (
        <>
          {!buttonNextClickState ? (
            <>
              {!letterOpened && (
                <h1 style={{ color: "#ececec" }}>
                  Please click the envelope to open the message
                </h1>
              )}
              <div>
                <OpeningLetter onOpen={handleLetterOpen} />
              </div>
              {letterOpened && (
                <div className="btn">
                  <button
                    className="next-button"
                    onClick={() => setButtonNextClickState(true)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <QNA />
            </>
          )}
        </>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
