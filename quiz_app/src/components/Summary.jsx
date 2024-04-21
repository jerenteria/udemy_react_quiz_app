import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    // the correct answer is the userAnswer and we compare user answer of that questions index to see if its the first choice on that question
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="trophy icon" />
      <h2>Quiz is completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
          {/* output number of question to which the answer belongs to by taking in the index of the question provided automatically by javascript since
          we are using map() it will get the index of all questions */}
        {userAnswers.map((answer, index) => {
            let cssClass = 'user-answer';
            if(answer === null) {
                cssClass += ' skipped';
            } else if (answer === QUESTIONS[index].answers[0]) {
                cssClass += ' correct'
            } else {
                cssClass += ' wrong';
            }
         return( <li key={index}>
              {/* need to add 1 so that question 1 would be at index 0 so instead of returning 0 for first questions we add 1 and return 1 for question 1 
              and do that for all questions(question 2 would be 1 + 1 which results as question 2) */}
            <h3>{index + 1}</h3>
            {/* to output the question text we can use the QUESTIONS raw data and use that index to access the different questions and output the text */}
            <p className="question">{QUESTIONS[index].text}</p>
            <p className={cssClass}>{answer ?? 'Skipped Question'}</p>
          </li>
          );
        })}
      </ol>
    </div>
  );
}
