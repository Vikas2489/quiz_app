import React from 'react';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  // addStylesToAnswer = (answerArray, index, answer) => {
  //   if (answer && answerArray && answerArray.length > 0) {
  //     return answerArray[index].answer == answer
  //       ? 'text-white bg-[#5cb668] border-[1.5px] border-solid border-[#D7DCE0] w-full my-6 rounded py-3 px-3'
  //       : '';
  //   } else {
  //     return 'text-[#292828] border-[1.5px] border-solid border-[#D7DCE0] w-full my-6 rounded py-3 px-3 hover:text-[#5cb668]';
  //   }
  // };

  render() {
    let { questionNumber, allQuestions } = this.props;
    if (this.props.answerByUser.length > 0) {
      var { answerByUser } = this.props;
    }

    let allAnswers = allQuestions[questionNumber].incorrect_answers.concat(
      allQuestions[questionNumber].correct_answer
    );
    return (
      <section className="cnt_of_question">
        <div>
          <p>Question {questionNumber + 1}/10</p>
          <progress
            max="10"
            min="1"
            value={questionNumber + 1}
            className="w-full h-[6px]"
          ></progress>
        </div>
        <h2 className="text-4xl my-4 text-[#292828] font-semibold leading-[2.8rem] ">
          {allQuestions[questionNumber].question}
        </h2>
        <ul>
          {/*  all answers  */}
          {allAnswers.map((answer) => {
            return (
              <li
                key={answer}
                onClick={() => this.props.updateAnswerByUser(answer)}
                className={
                  answerByUser &&
                  answerByUser.length > 0 &&
                  answerByUser[questionNumber] == answer
                    ? 'text-white bg-[#5cb668] border-[1.5px] border-solid border-[#D7DCE0] w-full my-6 rounded py-3 px-3'
                    : 'text-[#292828] border-[1.5px] border-solid border-[#D7DCE0] w-full my-6 rounded py-3 px-3 hover:text-[#5cb668]'
                }
              >
                {answer}
              </li>
            );
          })}
          {this.props.hasNotSelectedAnyAnswer == true ? (
            <span className="block text-center text-red-700 font-normal">
              Please select an answer!
            </span>
          ) : (
            ''
          )}
        </ul>
        <div className="text-right mb-16">
          <button
            onClick={this.props.updateCurrentQuestion}
            className="bg-[#5cb668] text-white py-2 px-8 rounded font-bold"
            type="button"
          >
            Next
          </button>
        </div>
      </section>
    );
  }
}
