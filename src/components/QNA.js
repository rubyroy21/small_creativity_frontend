import React, { useState } from "react";
import "./styles/qna.css";
import qnaData from "../utils/qnaData";
import axios from "axios";

const QNA = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [textAnswer, setTextAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadQuestion = () => {
    setSelectedAnswer("");
    setTextAnswer("");
  };

  const getSelected = () => selectedAnswer;

  const handleSubmit = async () => {
    const answer = getSelected();
    const isTextAnswerProvided = textAnswer.trim() !== "";

    if (
      (qnaData[currentQuestion].type === "textArea" && isTextAnswerProvided) ||
      (qnaData[currentQuestion].type !== "textArea" && answer)
    ) {
      setLoading(true);

      try {
        await axios.post("http://localhost:5000/api/submit-response", {
          questionId: currentQuestion, // Changed from new Date() to currentQuestion for simplicity
          answer,
          textAnswer,
        });
      } catch (error) {
        console.error("Error sending response:", error);
      }

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < qnaData.length) {
        setCurrentQuestion(nextQuestion);
        loadQuestion();
      } else {
        setFinished(true);
        try {
          await axios.get("http://localhost:5000/api/log-click");
        } catch (error) {
          console.error("Error logging click:", error);
        }
      }

      setLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.id);
  };

  const handleTextChange = (event) => {
    setTextAnswer(event.target.value);
  };

  const currentQuestionData = qnaData[currentQuestion];

  return (
    <div className="qna-container">
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      {!finished && !loading ? (
        <>
          <h2 id="question">{currentQuestionData.question}</h2>
          <div className="loading-bar">
            <div
              className="loading-bar-progress"
              style={{
                width: `${((currentQuestion + 1) * 100) / qnaData.length}%`,
              }}
            ></div>
          </div>
          <ul>
            {currentQuestionData.type === "textArea" ? (
              <li>
                <textarea
                  value={textAnswer}
                  onChange={handleTextChange}
                  placeholder="Your answer here..."
                />
              </li>
            ) : (
              ["a", "b", "c", "d"].map(
                (option) =>
                  currentQuestionData[option] && (
                    <li key={option}>
                      <input
                        type="radio"
                        name="answer"
                        id={option}
                        className="answer"
                        checked={selectedAnswer === option}
                        onChange={handleOptionChange}
                      />
                      <label htmlFor={option} id={`${option}_text`}>
                        {currentQuestionData[option]}
                      </label>
                    </li>
                  )
              )
            )}
          </ul>
          <button id="submit" onClick={handleSubmit}>
            {currentQuestion < qnaData.length - 1 ? "Next" : "Finish"}
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </>
      ) : finished && !loading ? (
        <div>
          <h2>Thank you for your responses! 😊</h2>
          <button onClick={() => window.location.reload()}>
            Reload <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default QNA;
