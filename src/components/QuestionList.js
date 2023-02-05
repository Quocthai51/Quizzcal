import React from "react";
import Question from "./Question";
import { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import "./QuestionList.css";
import { decode } from "html-entities";

const QuestionList = () => {
  // const [allAnswers, setAllAnswers] = useState(
  //   shuffleArray([...props.inCorrectAns, props.correctAns])
  // );
  const [count, setCount] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=31&type=multiple"
      );
      const data = await res.json();
      let q = [];
      data.results.forEach((question) => {
        q.push({
          id: nanoid(),
          question: question.question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          correctAns: question.correct_answer,
          checked: false,
          selected: null,
        });
      });
      setQuestionsArray(q);
    }
    getQuestion();
  }, [count]);

  function handleCheckAnswer() {
    setQuestionsArray((questions) =>
      questions.map((question) => {
        return { ...question, checked: true };
      })
    );
    setChecked(true);
    let correct = 0;
    questionsArray.forEach((question) => {
      if (question.correctAns === question.selected) {
        correct++;
      }
    });
    setCorrect(correct);
  }

  function handleClickAnswer(id, answer) {
    setQuestionsArray((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer }
          : question;
      })
    );
  }

  function handlePlayAgain() {
    setCount((count) => count + 1);
    setChecked(false);
  }

  console.log(questionsArray);
  const questionElement = questionsArray.map((question) => {
    return (
      <Question
        key={question.id}
        q={question}
        id={question.id}
        handleClickAnswer={handleClickAnswer}
      />
    );
  });

  return (
    <div
      style={{
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: 1050,
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          fontWeight: 700,
          fontSize: 21,
          flexDirection: "column",
          marginInline: 30,
        }}
      >
        {questionElement}
      </div>
      <div style={{ alignSelf: "center" }}>
        {checked && (
          <span style={{ marginInline: 20 }}>
            You scored {correct}/5 correct answers
          </span>
        )}
        <button
          onClick={checked ? handlePlayAgain : handleCheckAnswer}
          style={{
            marginBlockStart: 25,
            cursor: "pointer",
          }}
          className="btn-start"
        >
          {checked ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </div>
  );
};

export default QuestionList;
