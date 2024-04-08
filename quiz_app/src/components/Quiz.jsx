import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]); // manages state of answers from user stored in an array []
  const [answerState, setAnswerState] = useState("");

  // keeps track of which question user is on
  // if user has answered 2 questions then the index of the next question will be 2 bc idx starts at 0
  // then we can use the index of user answers to know what question user is on and if the answer is correct or not
  // ex. ANSWERS = ['A', 'B'] idx of next question = 2 so user is on question 3
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length; // if current answer state is empty string(not answered yet) activequestionindex === useranswers.length otherwise ===

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        // return an arr with all prev selected answers and att the newly selected answer at the end
        return [...prevUserAnswers, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState(""); // resets timer answer does not get marked right or wrong
        }, 2000); // sets timer to 2 seconds
      }, 1000);
    },
    [activeQuestionIndex]
  );

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
    <div className="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
