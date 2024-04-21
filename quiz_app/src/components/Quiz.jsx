import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from './Summary.jsx';

export default function Quiz() {
  // store all selected answers
  const [userAnswers, setUserAnswers] = useState([]);

  // keeps track of which question user is on
  // if user has answered 2 questions then the index of the next question will be 2 bc idx starts at 0
  // then we can use the index of user answers to know what question user is on and if the answer is correct or not
  // ex. ANSWERS = ['A', 'B'] idx of next question = 2 so user is on question 3
  const activeQuestionIndex = userAnswers.length; // if current answer state is empty string(not answered yet) activequestionindex === useranswers.length otherwise ===

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
      // pass the users answers as a prop to summary object
      <Summary userAnswers={userAnswers} />
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
