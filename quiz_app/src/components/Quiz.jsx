import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswers] = useState([]);

  // keeps track of which question user is on
  // if user has answered 2 questions then the index of the next question will be 2 bc idx starts at 0
  // then we can use the index of user answers to know what question user is on and if the answer is correct or not
  // ex. ANSWERS = ['A', 'B'] idx of next question = 2 so user is on question 3
  const activeQuestionIndex = answerState === userAnswers.length; // if current answer state is empty string(not answered yet) activequestionindex === useranswers.length otherwise ===

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {

      setUserAnswers((prevUserAnswers) => {
        // return an arr with all prev selected answers and att the newly selected answer at the end
        return [...prevUserAnswers, selectedAnswer];
      });

    },
    []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [
    handleSelectAnswer,
  ]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="trophy icon" />
        <h2>Quiz is completed</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
