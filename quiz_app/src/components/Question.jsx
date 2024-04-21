import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";
import QUESTIONS from "../questions.js";
export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  // timer for every question when question component gets rendered
  let timer = 10000;

  // change timer depending on answeState
  // if we have a selected answer
  if (answer.selectedAnswer) {
    // then set the timer to 10 seconds bc thats how long it will take to show the user the correct answer
    timer = 1000;
  }

  // if we have an answer whether it is correct or not
  if (answer.isCorrect !== null) {
    // set timer to 2 seconds because thats now long it will take until we move to next question
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer, // set answer to answer selected(answer being taken in)
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer, // comparing it to answer being taken in(answer user selected) correct answer will always be the first option
      });
      // set timer to show user answer for 2 seconds
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer} // when we change timer value we destroy and recreate the questions timer component and force the interval to be recreated
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers} // render available answers not shuffled answers
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
