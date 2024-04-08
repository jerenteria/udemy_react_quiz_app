import { useRef } from 'react';


export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // create a new arr and spread the question answers into new arr so we dont edit original arr
    shuffledAnswers.current = [...answers];
    // sort will sort shuffledAnswers arr
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        // take a look at the last element in userAnswers arr and check if thats the answer taken in above at map(answer)
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
