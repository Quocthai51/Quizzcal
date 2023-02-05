import React, { useEffect } from "react";
// import { useState } from "react";
import "./Question.css";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

const Question = (props) => {
  let answers = props.q.answers;
  let correctAns = props.q.correctAns;
  let selected = props.q.selected;
  function handleClick(answer) {
    props.handleClickAnswer(props.id, answer);
  }

  const answerElement = answers.map((answer) => {
    let id = null;
    if (props.q.checked) {
      if (correctAns === answer) {
        id = "correct";
      } else if (selected === answer) {
        id = "selected";
      } else {
        id = "not-selected";
      }
    }

    return (
      <button
        key={nanoid()}
        id={id}
        className={answer === selected ? "answer selected" : "answer"}
        onClick={() => handleClick(answer)}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="Question--Container">
      <p className="Question--title">{decode(props.q.question)}</p>
      {answerElement}
    </div>
  );
};

export default Question;
